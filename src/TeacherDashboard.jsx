import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import API from "./api"; // Import your Axios instance
import TeachersTable from "./components/TeachersTable";
import NavItem from "./components/ui/NavItem";
import StatusCard from "./components/ui/StatusCard";
import uniLogo from "./assets/uni-logo.png";
import { Users, Clock, Home, BookOpen, LogOut } from "lucide-react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeacherTableModal from "./components/TeacherTableModal";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  // State to store student data
  const [generalStudents, setGeneralStudents] = useState([]);
  const [technicalStudents, setTechnicalGeneralStudents] = useState([]);
  const [isInterviewedModalOpen, setIsInterviewedModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    technical: 0,
    general: 0,
  });

  const fetchCurrentUser = async () => {
    try {
      const { data } = await API.get("/auth/me");
      if (data?.data?.user?.role === "counsellor") {
        navigate("/teacher/login");
      }
      setCurrentUser(data?.data?.user);
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  const fetchStudents = async () => {
    try {
      const { data } = await API.get("/students");
      // Extract the data from response
      const general = data?.data?.generalCandidates || [];
      const technical = data?.data?.technicalCandidates || [];

      setGeneralStudents(general);
      setTechnicalGeneralStudents(technical);

      // Update stats state
      setStats({
        technical: technical?.length,
        general: general?.length,
        total: technical?.length + general?.length,
      });
    } catch (error) {
      toast.error("Failed to fetch students");
    }
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchCurrentUser();
        await fetchStudents();
      } catch (error) {
        toast.error("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to login first");
      navigate("/teacher/login");
    } else {
      loadData();
    }
  }, []);

  const handleInterviewedViewClick = (student) => {
    setSelectedStudent(student);
    setIsInterviewedModalOpen(true);
  };

  const closeInterviewedModal = () => {
    setIsInterviewedModalOpen(false);
    setSelectedStudent(null);
    fetchStudents();
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      navigate("/teacher/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return (
          <>
            <div className="mb-8">
              <h2
                className="text-3xl font-bold text-gray-800 mb-4 text-center"
                style={{ marginTop: "10px", fontSize: "28px" }}
              >
                Teacher Dashboard
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
                  title="Total Interviews"
                  value={stats.total}
                  bgColor="bg-blue-50"
                  textColor="text-blue-600"
                />
                <StatusCard
                  icon={<Clock className="text-yellow-600" size={20} />}
                  title="Technical Interviews"
                  value={stats.technical}
                  bgColor="bg-yellow-50"
                  textColor="text-yellow-600"
                />
                <StatusCard
                  icon={<Clock className="text-yellow-600" size={20} />}
                  title="General Interviews"
                  value={stats.general}
                  bgColor="bg-yellow-50"
                  textColor="text-yellow-600"
                />
              </div>
            </div>

            <section
              className="my-8"
              style={{ marginTop: "80px", width: "100%" }}
            >
              <TeachersTable
                students={technicalStudents}
                handleViewClick={handleInterviewedViewClick}
                limit={5}
                interviewtype="Technical"
              />
            </section>

            <section
              className="my-8"
              style={{ marginTop: "65px", width: "100%" }}
            >
              <TeachersTable
                students={generalStudents}
                handleViewClick={handleInterviewedViewClick}
                limit={5}
                interviewtype="General"
              />
            </section>
          </>
        );
      case "students":
        return (
          <section className="my-8" style={{ marginTop: "10px" }}>
            <TeachersTable
              students={technicalStudents}
              handleViewClick={handleInterviewedViewClick}
              limit={5}
              interviewtype="Technical"
            />
          </section>
        );
      case "Teachers":
        return (
          <section style={{ marginTop: "10px" }}>
            <TeachersTable
              students={generalStudents}
              handleViewClick={handleInterviewedViewClick}
              limit={5}
              interviewtype="General"
            />
          </section>
        );

      default:
        return null;
    }
  };

  return (
    currentUser.role === "teacher" && (
      <div className="min-h-screen flex">
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
                icon={<Users size={19} />}
                label="Technical Candidates"
                active={activeNav === "students"}
                onClick={() => setActiveNav("students")}
              />
              <NavItem
                icon={<BookOpen size={19} />}
                label="General Candidates"
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
            backgroundColor: "#f9fafb",
            padding: "20px 60px 00px 30px",
            minHeight: "100vh",
            overflowY: "auto",
          }}
        >
          <main>{renderContent()}</main>
        </div>
        <TeacherTableModal
          isOpen={isInterviewedModalOpen}
          onClose={closeInterviewedModal}
          selectedStudent={selectedStudent}
          onUpdateStudent={fetchStudents}
          currentUser={currentUser}
        />
      </div>
    )
  );
};

export default TeacherDashboard;
