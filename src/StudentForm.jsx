import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import uniLogo from "./assets/uni-logo.png";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { degreeOptions } from "./components/constants/degreeData";
import { schoolsData } from "./components/constants/schoolData";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import API from "./api";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      fathersName: "",
      gender: "",
      courseName: "",
      schoolName: "", // Added school name field
      state: "",
      city: "",
      selectDate: null,
      selectTime: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
        .required("First Name is required"),
      lastName: Yup.string().matches(
        /^[A-Za-z]+$/,
        "Only alphabets are allowed"
      ),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      contactNumber: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Contact Number is required"),
      fathersName: Yup.string().required("Father's Name is required"),
      gender: Yup.string().required("Gender is required"),
      courseName: Yup.string().required("Course Name is required"),
      schoolName: Yup.string().required("School Name is required"), // Added validation
      state: Yup.string().required("State is required"),
      city: Yup.string().required("City is required"),
      selectDate: Yup.date().required("Date is required"),
      selectTime: Yup.date().required("Time is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await API.post("/students", {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          contactNumber: values.contactNumber,
          fathersName: values.fathersName,
          gender: values.gender,
          courseName: values.courseName,
          schoolName: values.schoolName,
          state: values.state,
          city: values.city,
          selectDate: values.selectDate.toISOString(),
          selectTime: values.selectTime.toISOString(),
        });

        toast.success("Student added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        formik.resetForm();
      } catch (error) {
        console.log(error);
        toast.error(error || "Failed to add student", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     toast.error("You need to login first");
  //     navigate("/counsellor/login");
  //   }
  // }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#e3f2fd",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="form-student"
        style={{
          // width: "50%",
          padding: "2rem",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            margin: "15px auto 30px auto",
            width: "50%",
            height: "100%",
          }}
        >
          <img src={uniLogo} width="100%" alt="University Logo" />
        </div>
        <Grid container spacing={3}>
          {/* First Name and Last Name */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>

          {/* Email and Contact Number */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="contactNumber"
              name="contactNumber"
              label="Contact Number"
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.contactNumber &&
                Boolean(formik.errors.contactNumber)
              }
              helperText={
                formik.touched.contactNumber && formik.errors.contactNumber
              }
            />
          </Grid>

          {/* Father's Name and Gender */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="fathersName"
              name="fathersName"
              label="Father's Name"
              value={formik.values.fathersName}
              onChange={formik.handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.fathersName && Boolean(formik.errors.fathersName)
              }
              helperText={
                formik.touched.fathersName && formik.errors.fathersName
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={formik.values.gender}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      formik.touched.gender && formik.errors.gender
                        ? "#d32f2f"
                        : "rgba(0, 0, 0, 0.23)",
                  },
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Course Name */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="courseName-label">Course Name</InputLabel>
              <Select
                labelId="courseName-label"
                id="courseName"
                name="courseName"
                value={formik.values.courseName}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      formik.touched.courseName && formik.errors.courseName
                        ? "#d32f2f"
                        : "rgba(0, 0, 0, 0.23)",
                  },
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.courseName && Boolean(formik.errors.courseName)
                }
              >
                {degreeOptions.map((course) => (
                  <MenuItem key={course.value} value={course.value}>
                    {course.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* School Name - New Field */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="schoolName-label">School Name</InputLabel>
              <Select
                labelId="schoolName-label"
                id="schoolName"
                name="schoolName"
                value={formik.values.schoolName}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      formik.touched.schoolName && formik.errors.schoolName
                        ? "#d32f2f"
                        : "rgba(0, 0, 0, 0.23)",
                  },
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.schoolName && Boolean(formik.errors.schoolName)
                }
              >
                {schoolsData.map((school) => (
                  <MenuItem key={school.value} value={school.value}>
                    {school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* State and City */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="state"
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="city"
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>

          {/* Select Date and Time */}
          <Grid item xs={12} md={6}>
            <DatePicker
              selected={formik.values.selectDate}
              onChange={(date) => formik.setFieldValue("selectDate", date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select Date"
              wrapperClassName="w-full"
              customInput={
                <TextField
                  fullWidth
                  label="Select Date"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                  value={
                    formik.values.selectDate
                      ? formik.values.selectDate.toLocaleDateString()
                      : ""
                  }
                  error={
                    formik.touched.selectDate &&
                    Boolean(formik.errors.selectDate)
                  }
                  helperText={
                    formik.touched.selectDate && formik.errors.selectDate
                  }
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              selected={formik.values.selectTime}
              onChange={(time) => formik.setFieldValue("selectTime", time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              wrapperClassName="w-full"
              timeCaption="Time"
              dateFormat="h:mm aa"
              placeholderText="Select Time"
              customInput={
                <TextField
                  fullWidth
                  label="Select Time"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                  value={
                    formik.values.selectTime
                      ? formik.values.selectTime.toLocaleTimeString()
                      : ""
                  }
                  error={
                    formik.touched.selectTime &&
                    Boolean(formik.errors.selectTime)
                  }
                  helperText={
                    formik.touched.selectTime && formik.errors.selectTime
                  }
                />
              }
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#42a5f5",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1976d2")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#42a5f5")}
            >
              Submit
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default StudentForm;
