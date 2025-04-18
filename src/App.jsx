import React from "react";
import "./index.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import StudentForm from "./StudentForm";
import SignUp from "./SignUp";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeacherSignUp from "./TeacherSignUp";
import TeacherDashboard from "./TeacherDashboard";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/counsellor/login" element={<SignUp />} />
          <Route path="/teacher/login" element={<TeacherSignUp />} />
          <Route path="teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/form" element={<StudentForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
