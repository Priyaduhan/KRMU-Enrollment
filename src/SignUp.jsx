import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import uniLogo from "./assets/uni-logo.png";
import API from "./api";
import krm2 from "./assets/krm-new.png";

const SignUp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const navigate = useNavigate();

  // Form state for login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Form state for signup
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error states
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");

  const [typeEffect] = useTypewriter({
    words: ["Excellence", "Success", "Imagination", "Growth", "Innovation"],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 40,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError("All fields are required.");
      return;
    }
    if (!validateEmail(loginEmail)) {
      setLoginError("Please enter a valid email ending with @krmu.edu.in");
      return;
    }

    try {
      const { data } = await API.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setLoginError(error || "Credentials are not right");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    let error = "";

    // Clean and validate username
    const cleanedUsername = username.trim().replace(/\s+/g, " ");

    console.log(cleanedUsername);

    // Validate username

    if (!cleanedUsername || !/^[A-Za-z\s]+$/.test(cleanedUsername)) {
      error = "Username must contain only alphabets.";
    }

    // Validate phone number
    else if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      error = "Phone number must be exactly 10 digits.";
    }
    // Validate email
    else if (!email || !validateEmail(email)) {
      error = "Please enter a valid email ending with @krmu.edu.in";
    }
    // Validate password
    else if (!password || !validatePassword(password)) {
      error =
        "Password must be at least 8 characters long and include at least 1 alphabet and 1 number.";
    }
    // Validate confirm password
    else if (password !== confirmPassword) {
      error = "Passwords do not match.";
    }

    if (error) {
      setSignupError(error);
      return;
    }

    try {
      const { data } = await API.post("/auth/register", {
        username: cleanedUsername, // Use the cleaned version
        phoneNumber,
        email,
        password,
        confirmPassword,
        role: "counsellor",
      });

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      setSignupError(error || "Signup failed");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between login and signup
    setLoginError("");
    setSignupError("");
  };

  // Helper function to validate email
  const validateEmail = (email) => {
    return /^[^\s@]+@krmu.edu.in$/.test(email);
  };

  // Helper function to validate password
  const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);
  };

  return (
    <div
      className="Main-login"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${krm2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div className="content" style={{ color: "rgba(248, 248, 255, 0.76)" }}>
        <h2>
          <p>
            Welcome to <span>K.R. Mangalam University</span>
          </p>
        </h2>
        <p style={{ fontSize: "17px", marginTop: "4px" }}>
          Your Final destination for <span>{typeEffect}</span>
        </p>
      </div>
      <div
        className={`login-container ${isLogin ? "" : "flipped"}`}
        style={{ color: "rgba(248, 248, 255, 0.76)" }}
      >
        <div
          className={`login-logo ${isLogin ? "" : "flipped"}`}
          style={{
            textAlign: "center",
            margin: "auto",
            width: "75%",
            height: "100%",
            marginBottom: "25px",
          }}
        >
          <img src={uniLogo} width="100%" alt="University Logo" />
        </div>

        {/* Login Form */}
        {isLogin ? (
          <>
            <h2
              className="form-title"
              style={{ fontSize: "18px", marginTop: "12px" }}
            >
              Log in As Counsellor
            </h2>
            <form action="#" className="login-form" onSubmit={handleLogin}>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="input-field"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                <i className="material-symbols-rounded">mail</i>
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <i className="material-symbols-rounded">lock</i>
              </div>
              {loginError && <p className="error-message">{loginError}</p>}
              <a href="#">forgot password?</a>
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
            <p
              className="signup-text"
              style={{ color: "black", fontWeight: "500", fontSize: "14px" }}
            >
              Don't have an account? <a onClick={toggleForm}>Signup now</a>
            </p>
          </>
        ) : (
          <>
            {/* Signup Form */}
            <h2
              className="form-title"
              style={{ fontSize: "18px", marginTop: "12px" }}
            >
              Sign Up As Counsellor
            </h2>
            <form action="#" className="login-form" onSubmit={handleSignup}>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Username"
                  className="input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <i className="material-symbols-rounded">person</i>
              </div>
              <div className="input-wrapper">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input-field"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <i className="material-symbols-rounded">phone</i>
              </div>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i className="material-symbols-rounded">mail</i>
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i className="material-symbols-rounded">lock</i>
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input-field"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <i className="material-symbols-rounded">lock</i>
              </div>
              {signupError && <p className="error-message">{signupError}</p>}
              <button type="submit" className="login-btn">
                Sign Up
              </button>
            </form>
            <p
              className={`signup-text ${isLogin ? "" : "flipped"}`}
              style={{ color: "black", fontWeight: "500", fontSize: "14px" }}
            >
              Already have an account? <a onClick={toggleForm}>Login now</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
