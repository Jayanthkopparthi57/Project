import React from "react";
import Aboutus from "./Aboutus";
import BetterCare from "./BetterCare";
import TopRatedDoctors from "./TopRatedDoctors";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          padding: "60px 8%",
          flexWrap: "wrap",
        }}
      >
        {/* Content */}
        <div
          style={{
            flex: "1",
            minWidth: "300px",
            maxWidth: "650px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(35px,5vw,70px)",
              lineHeight: "1.15",
              color: "#1f2937",
              marginBottom: "25px",
            }}
          >
            Healthcare that feels{" "}
            <span style={{ color: "#f87004" }}>
              refreshingly simple
            </span>
          </h1>

          <p
            style={{
              fontSize: "25px",
              color: "#555",
              marginBottom: "35px",
            }}
          >
            Find the doctor, book a visit in under 60 seconds, and keep every
            prescription and lab report neatly in one place.
          </p>

          <div
            style={{
              display: "flex",
              width: "100%",
              maxWidth: "500px",
              background: "white",
              overflow: "hidden",
              boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            }}
          >
            <input
              type="text"
              placeholder="Search for doctors, clinics, hospitals, etc."
              style={{
                flex: 1,
                height: "55px",
                border: "none",
                outline: "none",
                padding: "0 20px",
                fontSize: "16px",
              }}
            />

            <button
              style={{
                width: "120px",
                border: "none",
                backgroundColor: "#f87004",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
              onClick={()=>{navigate('/FindDoctor')}}
            >
              Search
            </button>
          </div>
          
        </div>
        <div>
          <img
            src="https://i.pinimg.com/736x/8f/df/fe/8fdffe029d9a697aa1eaa08bf5ec53c2.jpg"
            alt="Healthcare"
            style={{
              objectFit: "cover",
              boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
            }}
          />
        </div>
      </section>

      <Aboutus />
      <BetterCare />
      <TopRatedDoctors />
    </div>
  );
};

export default Hero;