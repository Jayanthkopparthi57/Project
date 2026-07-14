import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [accountType, setAccountType] = useState("patient");
  const [message, setMessage] = useState("");
  
  const [patient, setPatient] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    password: "",
  });
  const [doctor, setDoctor] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    password: "",
  });
  const navigate = useNavigate();

  const handlePatient = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleDoctor = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const createPatient = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/patients/signup", patient);
      const loggedInUser = {
        ...res.data.user,
        age: patient.age,
        gender: patient.gender,
        role: "Patient",
      };
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      setMessage(res.data.message);
      navigate("/profile");
    } catch (error) {
      setMessage(error.response?.data?.message || "Patient registration failed");
    }
  };

  const createDoctor = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/doctors/register", doctor);
      const loggedInUser = {
        ...res.data.doctor,
        phone: doctor.phone,
        role: "Doctor",
      };
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      setMessage(res.data.message);
      navigate("/profile");
    } catch (error) {
      setMessage(error.response?.data?.message || "Doctor registration failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f7fb",
        padding: "25px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#fff",
          padding: "25px",
          borderRadius: "8px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            margin: "0 0 18px",
            color: "#1e3a8a",
            fontSize: "28px",
          }}
        >
          Create Account
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
              backgroundColor: accountType === "patient" ? "#2563eb" : "#e5e7eb",
              color: accountType === "patient" ? "#fff" : "#333",
            }}
          >
            Patient Signup
          </button>
          <button
            type="button"
            onClick={() => setAccountType("doctor")}
            style={{
              ...switchButtonStyle,
              backgroundColor: accountType === "doctor" ? "#2563eb" : "#e5e7eb",
              color: accountType === "doctor" ? "#fff" : "#333",
            }}
          >
            Doctor Signup
          </button>
        </div>

        {message && (
          <p
            style={{
              textAlign: "center",
              color: message.toLowerCase().includes("failed") || message.toLowerCase().includes("exists") ? "#dc2626" : "#166534",
              fontWeight: "600",
              marginBottom: "15px",
            }}
          >
            {message}
          </p>
        )}

        {accountType === "patient" ? (
          <form onSubmit={createPatient}>
            <div style={{ marginBottom: "15px" }}>
              <label>Full Name</label>
              <input type="text" name="fullName" value={patient.fullName} placeholder="Full Name" onChange={handlePatient} required style={inputStyle} />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Email</label>
              <input type="email" name="email" placeholder="Email" onChange={handlePatient} value={patient.email} required style={inputStyle} />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Phone</label>
              <input type="text" name="phone" value={patient.phone} onChange={handlePatient} placeholder="Phone Number" required style={inputStyle} />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Age</label>
              <input name="age" type="number" onChange={handlePatient} value={patient.age} placeholder="Age" required style={inputStyle} />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Gender</label>
              <div style={{ display: "flex", gap: "18px", marginTop: "8px", flexWrap: "wrap" }}>
                <label>
                  <input type="radio" name="gender" value="Male" checked={patient.gender === "Male"} onChange={handlePatient} required /> Male
                </label>
                <label>
                  <input type="radio" name="gender" value="Female" checked={patient.gender === "Female"} onChange={handlePatient} /> Female
                </label>
                <label>
                  <input type="radio" name="gender" value="Other" checked={patient.gender === "Other"} onChange={handlePatient} /> Other
                </label>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label>Password</label>
              <input type="password" name="password" placeholder="Password" value={patient.password} onChange={handlePatient} required style={inputStyle} />
            </div>

            <button type="submit" style={submitButtonStyle}>Create Patient Account</button>
          </form>
        ) : (
          <form onSubmit={createDoctor}>
            <div style={{ marginBottom: "15px" }}>
              <label>Full Name</label>
              <input type="text" name="fullName" value={doctor.fullName} placeholder="Full Name" onChange={handleDoctor} required style={inputStyle} />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Email</label>
              <input type="email" name="email" value={doctor.email} placeholder="Email" onChange={handleDoctor} required style={inputStyle} />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Phone</label>
              <input type="text" name="phone" value={doctor.phone} placeholder="Phone Number" onChange={handleDoctor} required style={inputStyle} />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Specialization</label>
              <input type="text" name="specialization" value={doctor.specialization} placeholder="Specialization" onChange={handleDoctor} required style={inputStyle} />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Experience</label>
              <input type="number" name="experience" value={doctor.experience} placeholder="Experience" onChange={handleDoctor} required style={inputStyle} />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label>Password</label>
              <input type="password" name="password" value={doctor.password} placeholder="Password" onChange={handleDoctor} required style={inputStyle} />
            </div>

            <button type="submit" style={submitButtonStyle}>Create Doctor Account</button>
          </form>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "15px",
  boxSizing: "border-box",
};

const switchButtonStyle = {
  flex: 1,
  padding: "11px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};

const submitButtonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#f67543",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer",
};

export default SignUp;
