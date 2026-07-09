import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TopRatedDoctors = () => {
  const [topd, setTopd] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/doctors/")
      .then((response) => {
        setTopd(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);
return(
  <div
  style={{
    width: "100%",
    fontFamily: "Arial, sans-serif",
  }}
>
  <h1
    style={{
      color: "#f87004",
      textAlign: "center",
    }}
  >
    Top Rated Doctors
  </h1>

  <div
    style={{
      display: "flex",
      gap: "25px",
      margin:"50px",
      overflowX: "auto",
      padding: "20px 0",
    }}
  >
    {topd.map((doctor) => (
      <div
        key={doctor._id}
        style={{
          minWidth: "280px",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          border: "1px solid #ddd",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#f87004",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            fontSize: "25px",
          }}
        >
          {doctor.fullName.charAt(0).toUpperCase()}
        </div>

        <h2 style={{ color: "#333" }}>
          {doctor.fullName}
        </h2>

        <p>
          <b>Specialization:</b><br />
          {doctor.specialization}
        </p>

        <p>
          <b>Experience:</b><br />
          {doctor.experience} Years
        </p>

        <p>
          <b>Phone:</b><br />
          {doctor.phone}
        </p>

        <Link
          to={`/doctors/${doctor._id}`}
          style={{ textDecoration: "none" }}
        >
          <button
            style={{
              width: "100%",
              padding: "10px",
              background: "#f87004",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Book Appointment
          </button>
        </Link>
      </div>
    ))}
  </div>
</div>
);
};

export default TopRatedDoctors;
