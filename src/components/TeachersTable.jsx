import React, { useState } from "react";
import StudentDetailModal from "./StudentDetailModal";

const TeachersTable = ({ teachers }) => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewClick = (student) => {
    setSelectedTeacher(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null);
  };
  return (
    <>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Teachers Available for Interview
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
                style={{ width: "26%" }}
              >
                Candidates
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr
                key={teacher.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {teacher.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {teacher.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {teacher.course}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {teacher.stu}
                </td>
                <td
                  style={{
                    padding: "16px 0px",
                    whiteSpace: "nowrap",
                    fontSize: "14px",
                    color: "#4b5563",
                    textAlign: "center",
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
                    // onClick={() => handleViewClick(teacher)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Student Details */}
    </>
  );
};

export default TeachersTable;
