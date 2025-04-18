import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

import StudentTable from "./components/StudentTable";
import TeachersTable from "./components/TeachersTable";
import NavItem from "./components/ui/NavItem";
import StatusCard from "./components/StatusCard";
import uniLogo from "./assets/uni-logo.png";
import StudentDetailModal from "./components/StudentDetailModal";

import { teacherData, stats } from "./components/constants/constantData";

import {
  Users,
  UserCheck,
  Clock,
  Home,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import InterviewedCandidates from "./components/InterviewedCandidates";
import InterviewedStudentsModal from "./components/InterviewedStudentsModal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const navigate = useNavigate();

  // State to store student data
  const [students, setStudents] = useState([]);
  const [teachers] = useState(teacherData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInterviewedModalOpen, setIsInterviewedModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStudentUpdateFormat, setSelectedStudentUpdateFormat] =
    useState(null);

  const [activeNav, setActiveNav] = useState("dashboard");

  const handleViewClick = (student) => {
    // Find the selected student from the students array
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const currentStudent = storedStudents.find((s) => s.id === student.id);
    setSelectedStudent(currentStudent);
    setSelectedStudentUpdateFormat(student);
    setIsModalOpen(true);
  };

  const handleInterviewedViewClick = (student) => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const currentStudent = storedStudents.find((s) => s.id === student.id);
    setSelectedStudent(currentStudent);
    setSelectedStudentUpdateFormat(student);
    setIsInterviewedModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const closeInterviewedModal = () => {
    setIsInterviewedModalOpen(false);
    setSelectedStudent(null);
  };

  // Fetch student data from localStorage on component mount
  useEffect(() => {
    console.log("ruuuning");
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const formattedStudents = storedStudents.map((student) => ({
      id: student.id,
      name: `${student.firstName} ${student.lastName}`,
      course: student.courseName,
      zoomStatus: student.url ? "Added" : "Pending", // Check if URL exists
      teacherAssigned: "Assigned", // Default to "Pending" (you can update this logic as needed)
      mcq: student.mcq || 0, // Use the MCQ value from localStorage
    }));
    setStudents(formattedStudents);
  }, [isModalOpen, isInterviewedModalOpen]);

  // Function to update student data
  const handleUpdateStudent = (updatedStudent) => {
    const updatedStudents = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedStudents);
  };

  const handleAccept = () => {
    const updatedStudent = {
      ...selectedStudent,
      status: "Accepted",
    };
    handleUpdateStudent(updatedStudent);
    closeInterviewedModal();
    toast.success("Candidate acceptance email sent successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleReject = () => {
    const updatedStudent = {
      ...selectedStudent,
      status: "Rejected",
    };
    handleUpdateStudent(updatedStudent);
    closeInterviewedModal();
    toast.success("Candidate rejection email sent successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                Counsellor Dashboard
              </h2>
              <div
                className=" gap-6"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "25px",
                }}
              >
                <StatusCard
                  icon={<Users className="text-blue-600" size={20} />}
                  title="Total Candidates Enrolled"
                  value={stats.enrolled}
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
                  title="Currently in Interview"
                  value={stats.inInterview}
                  bgColor="bg-green-50"
                  textColor="text-green-600"
                />
              </div>
            </div>

            <section
              className="my-8"
              style={{ marginTop: "35px", width: "100%" }}
            >
              <StudentTable
                students={students}
                onUpdateStudent={handleUpdateStudent}
                handleViewClick={handleViewClick}
                closeModal={closeModal}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                limit={5}
              />
            </section>

            <section
              className="my-8"
              style={{ marginTop: "35px", width: "100%" }}
            >
              <InterviewedCandidates
                students={students}
                onUpdateStudent={handleUpdateStudent}
                handleViewClick={handleInterviewedViewClick}
                closeModal={closeInterviewedModal}
                isModalOpen={isInterviewedModalOpen}
                setIsModalOpen={setIsInterviewedModalOpen}
                limit={5}
              />
            </section>

            {/* <section style={{ marginTop: "35px" }}>
              <TeachersTable teachers={teachers} />
            </section> */}
          </>
        );
      case "students":
        return (
          <section className="my-8" style={{ marginTop: "10px" }}>
            <StudentTable
              students={students}
              onUpdateStudent={handleUpdateStudent}
              handleViewClick={handleViewClick}
              closeModal={closeModal}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </section>
        );
      case "Teachers":
        return (
          <section style={{ marginTop: "10px" }}>
            <InterviewedCandidates
              students={students}
              onUpdateStudent={handleUpdateStudent}
              handleViewClick={handleInterviewedViewClick}
              closeModal={closeInterviewedModal}
              isModalOpen={isInterviewedModalOpen}
              setIsModalOpen={setIsInterviewedModalOpen}
            />
          </section>
        );
      case "Logout":
        navigate("/");

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div
        className="w-1/6 shadow-lg fixed h-full"
        style={{
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e5e7eb",
        }}
      >
        <div className="p-6" style={{ height: "60%" }}>
          <h2
            className="text-2xl font-bold mb-8 my-16"
            style={{ color: "#1f2937", margin: "20px 0px 15px 12px" }}
          >
            <div
              style={{
                textAlign: "center",
                marginTop: "35px",
                width: "90%",
                height: "100%",
                marginBottom: "30px",
              }}
            >
              <img src={uniLogo} width="100%" alt="University Logo" />
            </div>
          </h2>

          {/* Navigation Items */}
          <div className="space-y-4">
            <NavItem
              icon={<Home size={19} />}
              label="Dashboard"
              active={activeNav === "dashboard"}
              onClick={() => setActiveNav("dashboard")}
            />
            <NavItem
              icon={<Users size={19} />}
              label="Candidates"
              active={activeNav === "students"}
              onClick={() => setActiveNav("students")}
            />
            <NavItem
              icon={<UserCheck size={19} />}
              label="Interviewed"
              active={activeNav === "Teachers"}
              onClick={() => setActiveNav("Teachers")}
            />

            <NavItem
              icon={<LogOut size={19} />}
              label="Logout"
              onClick={() => setActiveNav("Logout")}
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
      <StudentDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedStudent={selectedStudent}
        onUpdateStudent={handleUpdateStudent}
        selectedStudentUpdateFormat={selectedStudentUpdateFormat}
      />
      <InterviewedStudentsModal
        isOpen={isInterviewedModalOpen}
        onClose={closeInterviewedModal}
        selectedStudent={selectedStudent}
        onUpdateStudent={handleUpdateStudent}
        selectedStudentUpdateFormat={selectedStudentUpdateFormat}
        handleReject={handleReject}
        handleAccept={handleAccept}
      />
    </div>
  );
};

export default Dashboard;
