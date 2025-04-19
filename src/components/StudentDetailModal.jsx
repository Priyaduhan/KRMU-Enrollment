import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "./../api";

const StudentDetailModal = ({
  isOpen,
  onClose,
  student,
  onUpdate,
  teachersList,
}) => {
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    zoomLink: "",
    mcqScore: 0,
    technicalTeacher: "",
    generalTeacher: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && student) {
      setFormData({
        zoomLink: student.zoomLink || "",
        mcqScore: student.mcqScore || 0,
        technicalTeacher: student.technicalTeacher || "",
        generalTeacher: student.generalTeacher || "",
      });

      // // Fetch teachers from backend
      // const fetchTeachers = async () => {
      //   try {
      //     const { data } = await API.get("/users/teachers");
      //     setTeachers(data.teachers);
      //   } catch (error) {
      //     toast.error("Failed to load teachers");
      //   }
      // };
      // fetchTeachers();
    }
  }, [isOpen, student]);

  // const [zoomUrl, setZoomUrl] = useState(selectedStudent?.url || "");
  // const [mcqTest, setMCQTest] = useState(
  //   selectedStudent?.mcq?.toString() || ""
  // );
  // const [teachnicalInterview, setTeachnicalInterview] = useState(
  //   selectedStudent?.teachnicalTeacher || ""
  // );
  // const [generalInterview, setGeneralInterview] = useState(
  //   selectedStudent?.generalTeacher || ""
  // );
  // const [error, setError] = useState({ mcq: null, url: null });

  const [expandedRow, setExpandedRow] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    // Validate Teams URL
    if (
      !formData.zoomLink.startsWith(
        "https://teams.microsoft.com/l/meetup-join/"
      )
    ) {
      newErrors.zoomLink =
        "URL must start with https://teams.microsoft.com/l/meetup-join/";
    }

    // Validate MCQ score
    if (
      formData.mcqScore <= 0 ||
      formData.mcqScore > 100 ||
      isNaN(formData.mcqScore)
    ) {
      newErrors.mcqScore = "MCQ score must be between 0 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await API.patch(`/students/${student._id}`, {
        zoomLink: formData.zoomLink,
        mcqScore: Number(formData.mcqScore),
        technicalTeacher: formData.technicalTeacher,
        generalTeacher: formData.generalTeacher,
      });

      toast.success("Student updated successfully!");
      onUpdate(); // Refresh the student list
      onClose(); // Close the modal
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  console.log(errors);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // // Format ISO date to DD-MM-YYYY
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
        // setError("");
        // setZoomUrl("");
        // setMCQTest(null);
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      // setZoomUrl(selectedStudent?.url || zoomUrl);
      // setMCQTest(selectedStudent?.mcq?.toString() || mcqTest);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // const validateTeamsUrl = (url) => {
  //   const teamsUrlPattern =
  //     /^https:\/\/teams\.microsoft\.com\/l\/meetup-join\//;
  //   if (!teamsUrlPattern.test(url)) {
  //     setError((errors) => ({
  //       ...errors,
  //       url: "Microsoft Teams URL must start with https://teams.microsoft.com/l/meetup-join/",
  //     }));
  //     return false;
  //   }
  //   setError((errors) => ({ ...errors, url: null }));
  //   return true;
  // };

  // const validateMCQTestMark = (mark) => {
  //   if (typeof mark !== "number" || isNaN(mark) || mark < 1 || mark > 100) {
  //     setError((errors) => ({
  //       ...errors,
  //       mcq: "MCQ test marks must be between 1 and 100.",
  //     }));
  //     return false;
  //   }
  //   setError((errors) => ({ ...errors, mcq: null }));
  //   return true;
  // };

  // const handleSubmit = () => {
  //   const isTeamUrlValid = validateTeamsUrl(zoomUrl);
  //   const mark = parseFloat(mcqTest);
  //   const isMCQTestValid = validateMCQTestMark(mark);

  //   if (isTeamUrlValid && isMCQTestValid) {
  //     try {
  //       const updatedStudent = {
  //         ...selectedStudent,
  //         url: zoomUrl,
  //         mcq: mark,
  //         generalTeacher: generalInterview,
  //         teachnicalTeacher: teachnicalInterview,
  //         zoomStatus: zoomUrl ? "Added" : "Pending",
  //       };

  //       const storedStudents =
  //         JSON.parse(localStorage.getItem("students")) || [];
  //       const updatedStudents = storedStudents.map((student) =>
  //         student.id === updatedStudent.id ? updatedStudent : student
  //       );
  //       localStorage.setItem("students", JSON.stringify(updatedStudents));
  //       onUpdateStudent(updatedStudent);

  //       toast.success("Student details updated successfully!", {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });

  //       // onClose();
  //     } catch (error) {
  //       toast.error("Failed to update student details", {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //       console.error("Error updating student:", error);
  //     }
  //   }
  // };

  const handleCellClick = (content, index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const truncateText = (text, maxLength = 15) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  // if (!isOpen) return null;
  if (!isOpen || !student) return null;

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
          borderRadius: "8px",
          padding: "20px",
          width: "95%",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
          }}
          style={{
            position: "absolute",
            top: "0px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "35px",
            cursor: "pointer",
            color: "#4b5563",
          }}
        >
          ×
        </button>

        {/* Modal Heading */}
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Candidate Detail
        </h2>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Zoom Meeting URL Section */}
          <div style={{ marginTop: "30px" }}>
            <label
              htmlFor="zoomUrl"
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "700",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Microsoft Teams URL
            </label>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                width: "100%",
              }}
            >
              <input
                type="text"
                name="zoomLink"
                value={formData.zoomLink}
                onChange={handleChange}
                className={errors.zoomLink ? "input-error" : ""}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: `1px solid ${
                    errors.zoomLink ? "#dc2626" : "#d1d5db"
                  }`,
                  outline: "none",
                  fontSize: "14px",
                  color: "#374151",
                }}
                placeholder="https://teams.microsoft.com/l/meetup-join/..."
              />
              {errors.zoomLink && (
                <span
                  style={{
                    color: "#dc2626",
                    fontSize: "12px",
                    marginTop: "4px",
                    textAlign: "left",
                  }}
                >
                  {errors.zoomLink}
                </span>
              )}
            </div>
          </div>

          {/* MCQ Test Mark Section */}
          <div style={{ marginTop: "30px" }}>
            <label
              htmlFor="zoomUrl"
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "700",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              MCQ Test
            </label>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <input
                type="number"
                name="mcqScore"
                value={formData.mcqScore}
                onChange={handleChange}
                min="0"
                max="100"
                className={errors.mcqScore ? "input-error" : ""}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: `1px solid ${
                    errors.mcqScore ? "#dc2626" : "#d1d5db"
                  }`,
                  outline: "none",
                  fontSize: "14px",
                  color: "#374151",
                }}
                placeholder="Enter MCQ Test Mark"
              />
              {errors.mcqScore && (
                <span
                  style={{
                    color: "#dc2626",
                    fontSize: "12px",
                    marginTop: "4px",
                    textAlign: "left",
                  }}
                >
                  {errors.mcqScore}
                </span>
              )}
            </div>
          </div>

          {/* Teachers Selection */}
          <div style={{ marginTop: "30px" }}>
            <label
              htmlFor="technicalInterviewStatus"
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "700",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Technical Round
            </label>
            <select
              id="technicalInterviewStatus"
              value={formData.technicalTeacher}
              name="technicalTeacher"
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                outline: "none",
                fontSize: "14px",
                color: "#374151",
              }}
            >
              <option value="">Select Teacher</option>
              {teachersList.map((val, key) => (
                <option key={key} value={val.username}>
                  {val.username}
                </option>
              ))}
            </select>
          </div>

          {/* General Interview Status Section */}
          <div style={{ marginTop: "30px" }}>
            <label
              htmlFor="generalInterviewStatus"
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "700",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              General Round
            </label>
            <select
              id="generalInterviewStatus"
              value={formData.generalTeacher}
              onChange={handleChange}
              name="generalTeacher"
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                outline: "none",
                fontSize: "14px",
                color: "#374151",
              }}
            >
              <option value="">Select Teacher</option>
              {teachersList.map((val, key) => (
                <option key={key} value={val.username}>
                  {val.username}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <button
              onClick={handleSubmit}
              style={{
                marginLeft: "12px",
                display: "flex",
                justifyContent: "space-around",
                width: "10%",
                padding: "10px 17px",
                marginTop: "10px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1e40af")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>

        {/* Student Details Table */}
        {student && (
          <div style={{ marginTop: "40px", marginBottom: "30px" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "1rem",
              }}
            >
              <thead style={{ backgroundColor: "#f9fafb" }}>
                <tr>
                  {[
                    "ID",
                    "Name",
                    "Email",
                    "Contact",
                    "Course",
                    "School",
                    "Interview Date",
                    "Interview Time",
                  ].map((header, index) => (
                    <th
                      key={header}
                      style={{
                        padding: "0.75rem",
                        textAlign: "left",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color: "#6b7280",
                        textTransform: "uppercase",
                        width:
                          index === 0
                            ? "8%"
                            : index === 1
                            ? "12%"
                            : index === 2
                            ? "15%"
                            : index === 3
                            ? "10%"
                            : index === 4
                            ? "12%"
                            : index === 5
                            ? "12%"
                            : index === 6
                            ? "12%"
                            : "12%",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                  {[
                    student.studentId,
                    `${student.firstName} ${student.lastName}`,
                    student.email || "N/A",
                    student.contactNumber || "N/A",
                    student.courseName,
                    student.schoolName || "N/A",
                    formatDate(student.interviewDate),
                    formatTime(student.interviewTime),
                  ].map((content, index) => (
                    <td
                      key={index}
                      style={{
                        padding: "1rem 0.75rem",
                        fontSize: "0.875rem",
                        color: "#374151",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                      onClick={() => handleCellClick(content, index)}
                    >
                      {[1, 2, 3, 4, 5].includes(index)
                        ? truncateText(content)
                        : content}
                    </td>
                  ))}
                </tr>

                {/* Expanded row */}
                {expandedRow !== null && (
                  <tr>
                    <td
                      colSpan="8"
                      style={{
                        padding: "1rem",
                        backgroundColor: "#f8fafc",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <div style={{ fontWeight: 500, marginBottom: "0.5rem" }}>
                        {
                          [
                            "ID",
                            "Name",
                            "Email",
                            "Contact Number",
                            "Course",
                            "School",
                            "Interview Date",
                            "Interview Time",
                          ][expandedRow]
                        }
                      </div>
                      <div style={{ wordBreak: "break-word" }}>
                        {
                          [
                            student.studentId,
                            `${student.firstName} ${student.lastName}`,
                            student.email || "N/A",
                            student.contactNumber || "N/A",
                            student.courseName,
                            student.schoolName || "N/A",
                            formatDate(student.interviewDate),
                            formatTime(student.interviewTime),
                          ][expandedRow]
                        }
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetailModal;
