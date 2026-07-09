import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorSignUp = () => {
    const [doctor, setDoctor]=useState({
        fullName:"",
        email:"",
        phone:"",
        specialization:"",
        experience:"",
        password:""
    })
    const HandleDoctor =  (e) =>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }
    const navigate=useNavigate()
    const createDoctor = async(event)=>{
        event.preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/doctors/register",doctor)
            localStorage.setItem("loggedInUser", JSON.stringify({
                ...res.data.doctor,
                phone: doctor.phone,
                role: "Doctor"
            }))
            alert("registered successfully")
            navigate('/profile')
        }catch(error) {
            console.error(error)
            alert("registation failed! try again")
        }
    }
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f7f1e6",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          padding: "25px",
          borderRadius: "8px",
          boxShadow: "0 14px 34px rgba(43,45,66,0.08)",
          border: "1px solid #ffd8a8",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#2b2d42",
          }}
        >
          Sign Up
        </h2>

        <form onSubmit={createDoctor}>
          <div style={{ marginBottom: "15px" }}>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={doctor.fullName}
              placeholder="Full Name"
              onChange={HandleDoctor}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={doctor.email}
              placeholder="Email"
              onChange={HandleDoctor}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={doctor.phone}
              placeholder="Phone Number"
              onChange={HandleDoctor}
              style={inputStyle}
            />
          </div>
          <div>
            <label>Specialization</label>
            <input
            type="text"
            name="specialization"
            value={doctor.specialization}
            placeholder="specialization"
            onChange={HandleDoctor}
            style={inputStyle}
            />    
            </div>
            <div>
                <label>Experience</label>
                <input
                type="text"
                name="experience"
                value={doctor.experience}
                placeholder="Experience"
                onChange={HandleDoctor}
                style={inputStyle}
                />
            </div>
          
          <div style={{ marginBottom: "20px" }}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={doctor.password}
              placeholder="Password"
              onChange={HandleDoctor}
              style={inputStyle}
            />
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
            }}
          >
            Create Account
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: "18px",
            }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#ff9f1c",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  borderRadius: "6px",
  border: "1px solid #ffd8a8",
  fontSize: "15px",
  boxSizing: "border-box",
  backgroundColor: "#f7f1e6",
  color: "#2b2d42",
  outline: "none",
};

export default DoctorSignUp;
