import React from "react";

const InterviewedCandidates = ({ students, handleViewClick, limit }) => {
  const truncateString = (str, maxLength) => {
    if (!str) return "";
    return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "selected":
        return { bg: "#dcfce7", text: "#166534" }; // Green
      case "rejected":
        return { bg: "#fee2e2", text: "#991b1b" }; // Red
      case "pending":
        return { bg: "#fef3c7", text: "#92400e" }; // Amber
      default:
        return { bg: "#e5e7eb", text: "#4b5563" }; // Gray
    }
  };

  return (
    <div style={{ marginTop: "32px" }}>
      <h3
        style={{
          fontSize: "22px",
          fontWeight: "600",
          color: "#111827",
          marginBottom: "24px",
          textAlign: "center",
          letterSpacing: "-0.25px",
        }}
      >
        Interviewed Candidates
      </h3>

      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f9fafb",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <th
                style={{
                  padding: "16px 24px",
                  textAlign: "left",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#6b7280",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  width: "15%",
                }}
              >
                ID
              </th>
              <th
                style={{
                  padding: "16px 24px",
                  textAlign: "left",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#6b7280",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  width: "17%",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "16px 24px",
                  textAlign: "left",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#6b7280",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  width: "22%",
                }}
              >
                Course
              </th>
              <th
                style={{
                  padding: "16px 24px",
                  textAlign: "left",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#6b7280",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  width: "20%",
                }}
              >
                Interview Status
              </th>
              <th
                style={{
                  padding: "16px 24px",
                  textAlign: "left",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#6b7280",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  width: "16%",
                }}
              >
                Email Status
              </th>
              <th
                style={{
                  padding: "16px 24px",
                  textAlign: "right",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#6b7280",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  width: "20%",
                }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {students?.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "48px 24px",
                    color: "#6b7280",
                    fontSize: "16px",
                  }}
                >
                  No candidates interviewed yet
                </td>
              </tr>
            ) : (
              students
                ?.slice(Math.max(students.length - limit, 0))
                .map((student) => {
                  const statusColors = getStatusColor(student.status);
                  return (
                    <tr
                      key={student.id}
                      style={{
                        borderBottom: "1px solid #e5e7eb",
                        transition: "background-color 0.2s ease",
                        ":hover": {
                          backgroundColor: "#f9fafb",
                        },
                      }}
                    >
                      <td
                        style={{
                          padding: "16px 24px",
                          fontSize: "14px",
                          color: "#111827",
                          fontWeight: "500",
                        }}
                      >
                        {student.studentId}
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          fontSize: "14px",
                          color: "#374151",
                        }}
                      >
                        {truncateString(
                          `${student.firstName} ${student.lastName}`,
                          17
                        )}
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          fontSize: "14px",
                          color: "#374151",
                        }}
                      >
                        {truncateString(student.courseName, 25)}
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          fontSize: "14px",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            backgroundColor: statusColors.bg,
                            color: statusColors.text,
                            fontWeight: "500",
                            fontSize: "13px",
                          }}
                        >
                          {student.status || "Pending"}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          fontSize: "14px",
                          fontWeight: "500",
                          color:
                            student.zoomStatus === "Added"
                              ? "#16a34a"
                              : "#dc2626",
                        }}
                      >
                        {student.zoomStatus === "Added" ? "Sent" : "Pending"}
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          textAlign: "right",
                        }}
                      >
                        <button
                          onClick={() => handleViewClick(student)}
                          style={{
                            backgroundColor: "transparent",
                            border: "1px solid #2563eb",
                            color: "#2563eb",
                            borderRadius: "6px",
                            padding: "8px 16px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            ":hover": {
                              backgroundColor: "#2563eb",
                              color: "#ffffff",
                            },
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterviewedCandidates;
