import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import components
import Dashboard from "./Dashboard";
import StudentForm from "./StudentForm";
import SignUp from "./SignUp";
import TeacherSignUp from "./TeacherSignUp";
import TeacherDashboard from "./TeacherDashboard";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/counsellor/login" replace />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/counsellor/login" element={<SignUp />} />
          <Route path="/teacher/login" element={<TeacherSignUp />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/form" element={<StudentForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
