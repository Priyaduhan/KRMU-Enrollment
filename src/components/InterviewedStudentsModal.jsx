import React, { useEffect, useRef } from "react";
import { teacherData } from "./constants/constantData";

const InterviewedStudentsModal = ({
  isOpen,
  onClose,
  selectedStudent,
  onUpdateStudent,
  selectedStudentUpdateFormat,
  handleAccept,
  handleReject,
}) => {
  const modalRef = useRef(null);

  // Format ISO date to DD-MM-YYYY
  const formatDate = (isoDate) => {
    if (!isoDate) return "Not set";
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Format ISO date to 24-hour time (HH:MM)
  const formatTime = (isoDate) => {
    if (!isoDate) return "Not set";
    const date = new Date(isoDate);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          width: "95%",
          maxWidth: "42rem",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "1rem",
            color: "#4b5563",
            fontSize: "1.875rem",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#1f2937")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#4b5563")}
        >
          ×
        </button>

        {/* Modal Heading */}
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#1f2937",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Candidate Details
        </h2>

        {/* Student Information Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Row 1: Name and Last Name */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                First Name
              </label>
              <div
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.25rem",
                  border: "1px solid #e5e7eb",
                }}
              >
                {selectedStudentUpdateFormat.name.split(" ")[0] || "N/A"}
              </div>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                Last Name
              </label>
              <div
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.25rem",
                  border: "1px solid #e5e7eb",
                }}
              >
                {selectedStudentUpdateFormat.name
                  .split(" ")
                  .slice(1)
                  .join(" ") || "N/A"}
              </div>
            </div>
          </div>

          {/* Row 2: Email and Contact */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                Email
              </label>
              <div
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.25rem",
                  border: "1px solid #e5e7eb",
                }}
              >
                {selectedStudent.email || "N/A"}
              </div>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                Contact Number
              </label>
              <div
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.25rem",
                  border: "1px solid #e5e7eb",
                }}
              >
                {selectedStudent.contactNumber || "N/A"}
              </div>
            </div>
          </div>

          {/* New Row: Date and Time */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                Interview Date
              </label>
              <div
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.25rem",
                  border: "1px solid #e5e7eb",
                }}
              >
                {formatDate(selectedStudent.selectDate) || "Not set"}
              </div>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                Interview Time
              </label>
              <div
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.25rem",
                  border: "1px solid #e5e7eb",
                }}
              >
                {formatTime(selectedStudent.selectTime) || "Not set"}
              </div>
            </div>
          </div>

          {/* New Row: State and City */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                State
              </label>
              <div
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.25rem",
                  border: "1px solid #e5e7eb",
                }}
              >
                {selectedStudent.state || "N/A"}
              </div>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                City
              </label>
              <div
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.25rem",
                  border: "1px solid #e5e7eb",
                }}
              >
                {selectedStudent.city || "N/A"}
              </div>
            </div>
          </div>

          {/* Row 3: Course */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#374151",
                marginBottom: "0.25rem",
              }}
            >
              Course
            </label>
            <div
              style={{
                padding: "0.5rem",
                backgroundColor: "#f9fafb",
                borderRadius: "0.25rem",
                border: "1px solid #e5e7eb",
              }}
            >
              {selectedStudentUpdateFormat.course || "N/A"}
            </div>
          </div>

          {/* Row 4: School Name */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#374151",
                marginBottom: "0.25rem",
              }}
            >
              School Name
            </label>
            <div
              style={{
                padding: "0.5rem",
                backgroundColor: "#f9fafb",
                borderRadius: "0.25rem",
                border: "1px solid #e5e7eb",
              }}
            >
              {selectedStudent.school || "N/A"}
            </div>
          </div>

          {/* Row 5: MCQ Marks */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#374151",
                marginBottom: "0.25rem",
              }}
            >
              MCQ Test Marks
            </label>
            <div
              style={{
                padding: "0.5rem",
                borderRadius: "0.25rem",
                border: selectedStudentUpdateFormat.mcq
                  ? "1px solid #bbf7d0"
                  : "1px solid #e5e7eb",
                backgroundColor: selectedStudentUpdateFormat.mcq
                  ? "#f0fdf4"
                  : "#f9fafb",
              }}
            >
              {selectedStudentUpdateFormat.mcq || "Pending"}
            </div>
          </div>

          {/* Row 6: Teachers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                Technical Round
              </label>
              <div
                style={{
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                  border: selectedStudent.teachnicalTeacher
                    ? "1px solid #bbf7d0"
                    : "1px solid #e5e7eb",
                  backgroundColor: selectedStudent.teachnicalTeacher
                    ? "#f0fdf4"
                    : "#f9fafb",
                }}
              >
                {selectedStudent.teachnicalTeacher || "Pending"}
              </div>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                General Round
              </label>
              <div
                style={{
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                  border: selectedStudent.generalTeacher
                    ? "1px solid #bbf7d0"
                    : "1px solid #e5e7eb",
                  backgroundColor: selectedStudent.generalTeacher
                    ? "#f0fdf4"
                    : "#f9fafb",
                }}
              >
                {selectedStudent.generalTeacher || "Pending"}
              </div>
            </div>
          </div>

          {/* Row 7: Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
              paddingTop: "1rem",
            }}
          >
            <button
              onClick={handleReject}
              style={{
                padding: "0.5rem 1.5rem",
                backgroundColor: "#dc2626",
                color: "white",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#b91c1c")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#dc2626")
              }
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              style={{
                padding: "0.5rem 1.5rem",
                backgroundColor: "#16a34a",
                color: "white",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#15803d")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#16a34a")
              }
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewedStudentsModal;
