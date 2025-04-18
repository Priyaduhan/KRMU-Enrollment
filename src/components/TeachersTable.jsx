import React, { useState } from "react";
import StudentDetailModal from "./StudentDetailModal";

const TeachersTable = ({
  students,
  onUpdateStudent,
  handleViewClick,
  closeModal,
  isModalOpen,
  limit,
  setIsModalOpen,
  interviewtype,
}) => {
  const truncateString = (str, maxLength) => {
    if (!str) return "";
    return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
  };
  return (
    <>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        {interviewtype === "Technical"
          ? "Technical Interview Candidates"
          : "General Interview Candidates"}
      </h3>
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ marginTop: "25px" }}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: "15%" }}
              >
                ID
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: "17%" }}
              >
                Name
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: "22%" }}
              >
                Course
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: "20%" }}
              >
                Interview Status
              </th>

              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: "20%" }}
              ></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.length === 0 ? (
              <tr style={{}}>
                <td
                  colSpan="6"
                  className="text-center py-4"
                  style={{ paddingTop: "70px", paddingBottom: "50px" }}
                >
                  <strong style={{ fontSize: "20px" }}>
                    No student enrolled yet
                  </strong>
                </td>
              </tr>
            ) : (
              students
                .slice(Math.max(students.length - limit, 0))
                .map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {truncateString(student.name, 17)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {truncateString(student.course, 25)}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
                      style={{
                        color:
                          student.technicalStatus !== "Pending"
                            ? "#16a34a"
                            : "#dc2626",
                      }}
                    >
                      {student.technicalStatus}
                    </td>

                    <td
                      style={{
                        padding: "16px 0px",
                        whiteSpace: "nowrap",
                        fontSize: "14px",
                        color: "#4b5563",
                        textAlign: "right",
                      }}
                    >
                      <button
                        style={{
                          color: "#2563eb",
                          marginRight: "12px",
                          transition: "color 0.2s",
                          background: "",
                          border: "none",
                          cursor: "pointer",
                          padding: "10px 20px",
                        }}
                        onMouseOver={(e) => (e.target.style.color = "#1e40af")}
                        onMouseOut={(e) => (e.target.style.color = "#2563eb")}
                        onClick={() => handleViewClick(student)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Student Details */}
    </>
  );
};

export default TeachersTable;
