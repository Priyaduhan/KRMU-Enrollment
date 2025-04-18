import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

import TeachersTable from "./components/TeachersTable";
import NavItem from "./components/ui/NavItem";
import StatusCard from "./components/ui/StatusCard";
import uniLogo from "./assets/uni-logo.png";

import { stats } from "./components/constants/constantData";

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

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeacherTableModal from "./components/TeacherTableModal";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  // State to store student data
  const [students, setStudents] = useState([]);
  const [isInterviewedModalOpen, setIsInterviewedModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStudentUpdateFormat, setSelectedStudentUpdateFormat] =
    useState(null);

  const [activeNav, setActiveNav] = useState("dashboard");

  const handleInterviewedViewClick = (student) => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const currentStudent = storedStudents.find((s) => s.id === student.id);
    setSelectedStudent(currentStudent);
    setSelectedStudentUpdateFormat(student);
    setIsInterviewedModalOpen(true);
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
      technicalStatus: student.technicalStatus,
    }));
    setStudents(formattedStudents);
  }, [isInterviewedModalOpen]);

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
    toast.success("Candidate interview status update successfully!", {
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
                Teacher Dashboard
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
                  title="Total Interviews"
                  value={stats.enrolled}
                  bgColor="bg-blue-50"
                  textColor="text-blue-600"
                />
                <StatusCard
                  icon={<Clock className="text-yellow-600" size={20} />}
                  title="Technical Candidates"
                  value={stats.waitingForInterview}
                  bgColor="bg-yellow-50"
                  textColor="text-yellow-600"
                />
                <StatusCard
                  icon={<Clock className="text-yellow-600" size={20} />}
                  title="General Candidates"
                  value={stats.waitingForInterview}
                  bgColor="bg-yellow-50"
                  textColor="text-yellow-600"
                />
              </div>
            </div>

            <section
              className="my-8"
              style={{ marginTop: "35px", width: "100%" }}
            >
              <TeachersTable
                students={students}
                onUpdateStudent={handleUpdateStudent}
                handleViewClick={handleInterviewedViewClick}
                closeModal={closeInterviewedModal}
                isModalOpen={isInterviewedModalOpen}
                setIsModalOpen={setIsInterviewedModalOpen}
                limit={5}
                interviewtype="Technical"
              />
            </section>

            <section
              className="my-8"
              style={{ marginTop: "35px", width: "100%" }}
            >
              <TeachersTable
                students={students}
                onUpdateStudent={handleUpdateStudent}
                handleViewClick={handleInterviewedViewClick}
                closeModal={closeInterviewedModal}
                isModalOpen={isInterviewedModalOpen}
                setIsModalOpen={setIsInterviewedModalOpen}
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
              students={students}
              onUpdateStudent={handleUpdateStudent}
              handleViewClick={handleInterviewedViewClick}
              closeModal={closeInterviewedModal}
              isModalOpen={isInterviewedModalOpen}
              setIsModalOpen={setIsInterviewedModalOpen}
              interviewtype="Technical"
            />
          </section>
        );
      case "Teachers":
        return (
          <section style={{ marginTop: "10px" }}>
            <TeachersTable
              students={students}
              onUpdateStudent={handleUpdateStudent}
              handleViewClick={handleInterviewedViewClick}
              closeModal={closeInterviewedModal}
              isModalOpen={isInterviewedModalOpen}
              setIsModalOpen={setIsInterviewedModalOpen}
              interviewtype="General"
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
      <TeacherTableModal
        isOpen={isInterviewedModalOpen}
        onClose={closeInterviewedModal}
        selectedStudent={selectedStudent}
        onUpdateStudent={handleUpdateStudent}
        selectedStudentUpdateFormat={selectedStudentUpdateFormat}
        handleAccept={handleAccept}
      />
    </div>
  );
};

export default TeacherDashboard;
