import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import API from "./api"; // Import your Axios instance
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import StudentTable from "./components/StudentTable";
import NavItem from "./components/ui/NavItem";
import StatusCard from "./components/ui/StatusCard";
import uniLogo from "./assets/uni-logo.png";
import StudentDetailModal from "./components/StudentDetailModal";
import InterviewedCandidates from "./components/InterviewedCandidates";
import InterviewedStudentsModal from "./components/InterviewedStudentsModal";

// Icons
import { Users, UserCheck, Clock, Home, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [candidatesWaitingList, setCandidatesWaitingList] = useState([]);
  const [interviewedCandidates, setInterviewedCandidates] = useState([]);
  const [stats, setStats] = useState({
    enrolled: 0,
    waitingForInterview: 0,
    total: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInterviewedModalOpen, setIsInterviewedModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState({});
  const [teacherData, setTeacherData] = useState([]);

  // Fetch students and stats from backend
  const fetchStudents = async () => {
    try {
      const { data } = await API.get("/students");

      // Extract the data from response
      const waitingForInterview = data?.data?.waitingForInterview || [];
      const interviewedCandidates = data?.data?.interviewedCandidates || [];

      // Update the student lists
      setCandidatesWaitingList(waitingForInterview);
      setInterviewedCandidates(interviewedCandidates);

      // Calculate statistics
      const passedCandidates = data?.data?.interviewedCandidates.filter(
        (student) => student.status === "Pass"
      ).length;

      // Update stats state
      setStats({
        enrolled: passedCandidates,
        waitingForInterview: waitingForInterview.length,
        total: waitingForInterview.length + interviewedCandidates.length,
      });
    } catch (error) {
      toast.error("Failed to fetch students");
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const { data } = await API.get("/auth/me");
      if (data.data.user.role === "teacher") {
        navigate("/counsellor/login");
      }
      setCurrentUser(data.data.user);
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  const fetchTeachers = async () => {
    try {
      const { data } = await API.get("/auth/teachers");
      console.log(data.data.teachers);
      setTeacherData(data.data.teachers);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchCurrentUser();
        await fetchStudents();
        await fetchTeachers();
      } catch (error) {
        toast.error("Error loading data");
      } finally {
        setLoading(false);
      }
    };
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to login first");
      navigate("/counsellor/login");
    } else {
      loadData();
    }
  }, []);

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleInterviewedViewClick = (student) => {
    setSelectedStudent(student);
    setIsInterviewedModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    fetchStudents(); // Refresh data after modal closes
  };

  const closeInterviewedModal = () => {
    setIsInterviewedModalOpen(false);
    setSelectedStudent(null);
    fetchStudents(); // Refresh data after modal closes
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      navigate("/counsellor/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleAccept = async () => {
    try {
      const response = await API.post(
        `/students/${selectedStudent._id}/send-acceptance`
      );

      closeInterviewedModal();

      toast.success("Acceptance email sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error("Failed to send acceptance email", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleReject = async () => {
    try {
      const response = await API.post(
        `/students/${selectedStudent._id}/send-rejection`
      );

      closeInterviewedModal();

      toast.success("Rejection email sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error("Failed to send rejection email", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return (
          <>
            <div className="mb-8">
              <h2
                className="text-4xl font-bold text-gray-800 mb-4 text-center "
                style={{ marginTop: "10px", fontSize: "28px" }}
              >
                Counsellor Dashboard
              </h2>
              <div
                className=" gap-6"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "30px",
                }}
              >
                <StatusCard
                  icon={<Users className="text-blue-600" size={20} />}
                  title="Total Candidates"
                  value={stats.total}
                  bgColor="bg-blue-50"
                  textColor="text-blue-600"
                />
                <StatusCard
                  icon={<Clock className="text-yellow-600" size={20} />}
                  title="Waiting for Interview"
                  value={stats.waitingForInterview}
                  bgColor="bg-yellow-50"
                  textColor="text-yellow-600"
                />
                <StatusCard
                  icon={<UserCheck className="text-green-600" size={20} />}
                  title="Total Enrolled Candidates"
                  value={stats.enrolled}
                  bgColor="bg-green-50"
                  textColor="text-green-600"
                />
              </div>
            </div>

            <section
              className="my-8"
              style={{ marginTop: "80px", width: "100%" }}
            >
              <StudentTable
                students={candidatesWaitingList}
                handleViewClick={handleViewClick}
                limit={5}
              />
            </section>

            <section
              className="my-8"
              style={{ marginTop: "65px", width: "100%" }}
            >
              <InterviewedCandidates
                students={interviewedCandidates}
                handleViewClick={handleInterviewedViewClick}
                limit={5}
              />
            </section>
          </>
        );
      case "students":
        return (
          <section className="my-8" style={{ marginTop: "10px" }}>
            <StudentTable
              students={candidatesWaitingList}
              handleViewClick={handleViewClick}
              limit={5}
            />
          </section>
        );
      case "Teachers":
        return (
          <section style={{ marginTop: "10px" }}>
            <InterviewedCandidates
              students={interviewedCandidates}
              handleViewClick={handleInterviewedViewClick}
              limit={5}
            />
          </section>
        );
      default:
        return null;
    }
  };

  return (
    currentUser.role === "counsellor" && (
      <div className="min-h-screen flex">
        {/* Sidebar */}

        <div
          style={{
            width: "240px",
            position: "fixed",
            height: "100vh",
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e5e7eb",
            boxShadow: "4px 0 15px rgba(0, 0, 0, 0.02)",
            display: "flex",
            flexDirection: "column",
            zIndex: 10,
          }}
        >
          <div
            style={{
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {/* Logo Section */}
            <div
              style={{
                textAlign: "center",
                margin: "10px 0 40px",
                padding: "0 0px",
              }}
            >
              <img
                src={uniLogo}
                style={{
                  width: "100%",
                  maxWidth: "180px",
                  height: "auto",
                }}
                alt="University Logo"
              />
            </div>

            {/* Navigation Items */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                flexGrow: 1,
              }}
            >
              <NavItem
                icon={<Home size={20} />}
                label="Dashboard"
                active={activeNav === "dashboard"}
                onClick={() => setActiveNav("dashboard")}
              />
              <NavItem
                icon={<Users size={20} />}
                label="Candidates"
                active={activeNav === "students"}
                onClick={() => setActiveNav("students")}
              />
              <NavItem
                icon={<UserCheck size={20} />}
                label="Interviewed"
                active={activeNav === "Teachers"}
                onClick={() => setActiveNav("Teachers")}
              />

              {/* Spacer to push logout to bottom */}
              <div style={{ flexGrow: 1 }}></div>

              <NavItem
                icon={<LogOut size={20} />}
                label="Logout"
                onClick={handleLogout}
                isLogout={true}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="w-5/6 p-8 ml-[16.666667%]"
          style={{
            backgroundColor: "#f0f1f2",
            padding: "20px 60px 00px 30px",
            minHeight: "100vh",
            overflowY: "auto",
          }}
        >
          <main>{renderContent()}</main>
        </div>
        <StudentDetailModal
          isOpen={isModalOpen}
          onClose={closeModal}
          student={selectedStudent}
          onUpdate={fetchStudents}
          teachersList={teacherData}
        />

        <InterviewedStudentsModal
          isOpen={isInterviewedModalOpen}
          onClose={closeInterviewedModal}
          selectedStudent={selectedStudent}
          handleReject={handleReject}
          handleAccept={handleAccept}
        />
      </div>
    )
  );
};

export default Dashboard;
