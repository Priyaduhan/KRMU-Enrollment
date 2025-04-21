import React, { useEffect, useRef } from "react";

const InterviewedStudentsModal = ({
  isOpen,
  onClose,
  selectedStudent,
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
          padding: "1.25rem",
          width: "95%",
          height: "98%",
          maxWidth: "42rem",
          position: "relative",
          overflowY: "auto",
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
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#1f2937",
            marginBottom: "1.2rem",
            textAlign: "center",
          }}
        >
          Candidate Details
        </h2>

        {/* Student Information Form */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {/* Row 1: Name and Last Name */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "0.75rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.2rem",
                }}
              >
                First Name
              </label>
              <div
                style={{
                  padding: "0.4rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.25rem",
                  border: "1px solid #e5e7eb",
                  minHeight: "36px",
                }}
              >
                {selectedStudent.firstName || "N/A"}
              </div>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.2rem",
                }}
              >
                Last Name
              </label>
              <div
                style={{
                  padding: "0.4rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.25rem",
                  border: "1px solid #e5e7eb",
                  minHeight: "36px",
                }}
              >
                {selectedStudent.lastName || "N/A"}
              </div>
            </div>
          </div>

          {/* Row 2: Email and Contact */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "0.75rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.2rem",
                }}
              >
                Email
              </label>
              <div
                style={{
                  padding: "0.4rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.25rem",
                  border: "1px solid #e5e7eb",
                  minHeight: "36px",
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
                  marginBottom: "0.2rem",
                }}
              >
                Contact Number
              </label>
              <div
                style={{
                  padding: "0.4rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.25rem",
                  border: "1px solid #e5e7eb",
                  minHeight: "36px",
                }}
              >
                {selectedStudent.contactNumber || "N/A"}
              </div>
            </div>
          </div>

          {/* Row 3: Date and Time */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "0.75rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.2rem",
                }}
              >
                Interview Date
              </label>
              <div
                style={{
                  padding: "0.4rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.25rem",
                  border: "1px solid #e5e7eb",
                  minHeight: "36px",
                }}
              >
                {formatDate(selectedStudent.interviewDate) || "Not set"}
              </div>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.2rem",
                }}
              >
                Interview Time
              </label>
              <div
                style={{
                  padding: "0.4rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.25rem",
                  border: "1px solid #e5e7eb",
                  minHeight: "36px",
                }}
              >
                {formatTime(selectedStudent.interviewTime) || "Not set"}
              </div>
            </div>
          </div>

          {/* Row 4: State and City */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "0.75rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.2rem",
                }}
              >
                State
              </label>
              <div
                style={{
                  padding: "0.4rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.25rem",
                  border: "1px solid #e5e7eb",
                  minHeight: "36px",
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
                  marginBottom: "0.2rem",
                }}
              >
                City
              </label>
              <div
                style={{
                  padding: "0.4rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.25rem",
                  border: "1px solid #e5e7eb",
                  minHeight: "36px",
                }}
              >
                {selectedStudent.city || "N/A"}
              </div>
            </div>
          </div>

          {/* Single Field Rows */}
          {[
            {
              label: "Course",
              value: selectedStudent.courseName || "N/A",
            },
            {
              label: "School Name",
              value: selectedStudent.schoolName || "N/A",
            },
            {
              label: "MCQ Test Marks",
              value: selectedStudent.mcqScore || "Pending",
              highlight: selectedStudent.mcqScore,
            },
          ].map((field, index) => (
            <div key={index}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "0.2rem",
                }}
              >
                {field.label}
              </label>
              <div
                style={{
                  padding: "0.4rem",
                  borderRadius: "0.25rem",
                  border: field.highlight
                    ? "1px solid #bbf7d0"
                    : "1px solid #e5e7eb",
                  backgroundColor: field.highlight ? "#f0fdf4" : "#f9fafb",
                  minHeight: "36px",
                }}
              >
                {field.value}
              </div>
            </div>
          ))}

          {/* Teacher Rows */}
          {[
            {
              label: "Technical Round",
              value: selectedStudent.technicalTeacher || "Pending",
              status: selectedStudent.technicalStatus,
              highlight: selectedStudent.technicalTeacher,
            },
            {
              label: "General Round",
              value: selectedStudent.generalTeacher || "Pending",
              status: selectedStudent.generalStatus,
              highlight: selectedStudent.generalTeacher,
            },
          ].map((teacher, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "0.75rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#374151",
                    marginBottom: "0.2rem",
                  }}
                >
                  {teacher.label}
                </label>
                <div
                  style={{
                    padding: "0.4rem",
                    borderRadius: "0.25rem",
                    border: teacher.highlight
                      ? "1px solid #bbf7d0"
                      : "1px solid #e5e7eb",
                    backgroundColor: teacher.highlight ? "#f0fdf4" : "#f9fafb",
                    minHeight: "36px",
                  }}
                >
                  {teacher.value}
                </div>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#374151",
                    marginBottom: "0.2rem",
                  }}
                >
                  {teacher.label} Status
                </label>
                <div
                  style={{
                    padding: "0.4rem",
                    borderRadius: "0.25rem",
                    border: teacher.highlight
                      ? "1px solid #bbf7d0"
                      : "1px solid #e5e7eb",
                    backgroundColor: teacher.highlight ? "#f0fdf4" : "#f9fafb",
                    minHeight: "36px",
                  }}
                >
                  {teacher.status || "Pending"}
                </div>
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.75rem",
              paddingTop: "0.75rem",
              marginTop: "0.5rem",
            }}
          >
            <button
              onClick={handleReject}
              style={{
                padding: "0.4rem 1.25rem",
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
                padding: "0.4rem 1.25rem",
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
