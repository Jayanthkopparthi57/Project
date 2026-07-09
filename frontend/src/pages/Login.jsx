import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [accountType, setAccountType] = useState("patient");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = accountType === "patient" ? "http://localhost:5000/patients/login" : "http://localhost:5000/doctors/login";
      const res = await axios.post(url, loginData);
      const user = accountType === "patient" ? res.data.user : res.data.doctor;
      localStorage.setItem("loggedInUser", JSON.stringify({
        ...user,
        role: accountType === "patient" ? "Patient" : "Doctor",
      }));
      navigate("/profile");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f7f1e6",
        padding: "25px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#ffffff",
          padding: "26px",
          borderRadius: "8px",
          boxShadow: "0 14px 34px rgba(43,45,66,0.08)",
          border: "1px solid #ffd8a8",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#2b2d42",
            margin: "0 0 18px",
            fontSize: "28px",
          }}
        >
          Login
        </h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <button
            type="button"
            onClick={() => setAccountType("patient")}
            style={{
              ...switchButtonStyle,
              backgroundColor: accountType === "patient" ? "#ff9f1c" : "#f7f1e6",
              color: "#2b2d42",
              border: accountType === "patient" ? "1px solid #ff9f1c" : "1px solid #ffd8a8",
            }}
          >
            Patient Login
          </button>
          <button
            type="button"
            onClick={() => setAccountType("doctor")}
            style={{
              ...switchButtonStyle,
              backgroundColor: accountType === "doctor" ? "#ff9f1c" : "#f7f1e6",
              color: "#2b2d42",
              border: accountType === "doctor" ? "1px solid #ff9f1c" : "1px solid #ffd8a8",
            }}
          >
            Doctor Login
          </button>
        </div>

        {message && (
          <p
            style={{
              color: "#2b2d42",
              backgroundColor: "#ffd8a8",
              border: "1px solid #ff9f1c",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              fontWeight: "800",
              marginBottom: "15px",
            }}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Email</label>
            <input type="email" name="email" value={loginData.email} onChange={handleChange} placeholder="Email" required style={inputStyle} />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Password</label>
            <input type="password" name="password" value={loginData.password} onChange={handleChange} placeholder="Password" required style={inputStyle} />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#ff9f1c",
              color: "#2b2d42",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "800",
            }}
          >
            Login
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
            color: "#2b2d42",
          }}
        >
          New user?{" "}
          <Link
            to="/signup"
            style={{
              color: "#ff9f1c",
              textDecoration: "none",
              fontWeight: "800",
            }}
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

const labelStyle = {
  color: "#2b2d42",
  fontWeight: "800",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  borderRadius: "8px",
  border: "1px solid #ffd8a8",
  fontSize: "15px",
  boxSizing: "border-box",
  backgroundColor: "#f7f1e6",
  color: "#2b2d42",
  outline: "none",
};

const switchButtonStyle = {
  flex: 1,
  padding: "11px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "800",
};

export default Login;
