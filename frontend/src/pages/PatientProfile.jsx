import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const PatientProfile = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getPatient();
  }, [id]);

  const getPatient = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/patients/${id}`);
      setPatient(res.data);
    } catch {
      setMessage("Unable to load patient profile");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Link to="/Appointments" style={buttonStyle}>Back</Link>

        <div style={boxStyle}>
          <h1 style={titleStyle}>Patient Profile</h1>

          {message && <p style={textStyle}>{message}</p>}

          {patient && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <ProfileItem label="Full Name" value={patient.fullName} />
              <ProfileItem label="Email" value={patient.email} />
              <ProfileItem label="Phone" value={patient.phone} />
              <ProfileItem label="Age" value={patient.age} />
              <ProfileItem label="Gender" value={patient.gender} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ label, value }) => {
  return (
    <div style={itemStyle}>
      <p style={{ margin: "0 0 6px", color: "#5f6175" }}>{label}</p>
      <h3 style={{ margin: 0, color: "#2b2d42" }}>
        {value === undefined || value === null || value === "" ? "Not available" : value}
      </h3>
    </div>
  );
};

const pageStyle = {
  minHeight: "100vh",
  background: "#f7f1e6",
  padding: "30px 16px",
};

const boxStyle = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "8px",
  boxShadow: "0 8px 22px rgba(43,45,66,0.1)",
  marginTop: "15px",
};

const itemStyle = {
  background: "#f7f1e6",
  padding: "15px",
  borderRadius: "8px",
};

const titleStyle = {
  margin: "0 0 18px",
  color: "#2b2d42",
};

const textStyle = {
  color: "#5f6175",
};

const buttonStyle = {
  display: "inline-block",
  padding: "10px 14px",
  background: "#ff9f1c",
  color: "#2b2d42",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "800",
};

export default PatientProfile;
