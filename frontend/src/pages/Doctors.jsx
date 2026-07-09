import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/doctors/");
      setDoctors(res.data);
    } catch {
      setMessage("Unable to load doctors");
    }
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor.fullName?.toLowerCase() || "";
    const specialization = doctor.specialization?.toLowerCase() || "";
    const keyword = search.toLowerCase();
    return name.includes(keyword) || specialization.includes(keyword);
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f1e6",
        padding: "30px 16px 45px",
      }}
    >
      <div
        style={{
          maxWidth: "980px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            margin: "0 0 18px",
            color: "#2b2d42",
            fontSize: "34px",
            lineHeight: "1.2",
          }}
        >
          Find Doctors
        </h1>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search doctor or specialty"
          style={{
            width: "100%",
            padding: "14px",
            border: "1px solid #dddddd",
            borderRadius: "8px",
            fontSize: "15px",
            boxSizing: "border-box",
            outline: "none",
            backgroundColor: "#ffffff",
            color: "#2b2d42",
            marginBottom: "22px",
          }}
        />

        {message && (
          <div
            style={{
              backgroundColor: "#ffffff",
              color: "#2b2d42",
              padding: "14px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: "700",
              boxShadow: "0 8px 20px rgba(43,45,66,0.08)",
            }}
          >
            {message}
          </div>
        )}

        {filteredDoctors.length === 0 ? (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "34px",
              textAlign: "center",
              color: "#2b2d42",
              boxShadow: "0 8px 20px rgba(43,45,66,0.08)",
            }}
          >
            No doctors found.
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "18px",
            }}
          >
            {filteredDoctors.map((doctor) => (
              <button
                key={doctor._id}
                onClick={() => navigate(`/doctors/${doctor._id}`)}
                style={{
                  flex: "1 1 360px",
                  maxWidth: "calc(50% - 9px)",
                  minWidth: "280px",
                  textAlign: "left",
                  backgroundColor: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "20px",
                  boxShadow: "0 8px 22px rgba(43,45,66,0.1)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    width: "62px",
                    height: "62px",
                    borderRadius: "50%",
                    backgroundColor: "#2b2d42",
                    color: "#ffffff",
                    fontSize: "25px",
                    fontWeight: "800",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {doctor.fullName?.charAt(0).toUpperCase()}
                </div>

                <div style={{ minWidth: 0 }}>
                  <h2
                    style={{
                      margin: "0 0 6px",
                      color: "#2b2d42",
                      fontSize: "20px",
                      lineHeight: "1.25",
                    }}
                  >
                    {doctor.fullName}
                  </h2>
                  <p
                    style={{
                      margin: "0 0 8px",
                      color: "#ff9f1c",
                      fontWeight: "800",
                    }}
                  >
                    {doctor.specialization}
                  </p>
                  <p style={detailStyle}>Experience: {doctor.experience || 0} Years</p>
                  <p style={detailStyle}>Phone: {doctor.phone}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const detailStyle = {
  margin: "4px 0",
  color: "#5f6175",
  fontSize: "14px",
  lineHeight: "1.4",
};

export default Doctors;
