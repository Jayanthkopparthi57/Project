import React, { useEffect, useState } from "react";
import SignUp from "./SignUp";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(savedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  if (!user) {
    return <SignUp />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f1e6",
        padding: "28px 16px 42px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "28px",
            boxShadow: "0 14px 34px rgba(43,45,66,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "26px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: "78px",
                  height: "78px",
                  backgroundColor: "#2b2d42",
                  color: "#ffffff",
                  borderRadius:"50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "32px",
                  fontWeight: "800",
                }}
              >
                {user.fullName?.charAt(0).toUpperCase()}
              </div>

              <div>
                <p
                  style={{
                    margin: "0 0 6px",
                    color: "#f87004",
                    fontWeight: "800",
                    fontSize: "14px",
                  }}
                >
                  Profile
                </p>
                <h1
                  style={{
                    margin: "0 0 6px",
                    color: "#2b2d42",
                    fontSize: "32px",
                    lineHeight: "1.15",
                  }}
                >
                  {user.fullName}
                </h1>
              </div>
            </div>

            <button
              onClick={logout}
              style={{
                padding: "12px 18px",
                backgroundColor: "#ff0000",
                color: "#2c004c",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "800",
              }}
            >
              Logout
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <ProfileItem label="Full Name" value={user.fullName} />
            <ProfileItem label="Email" value={user.email} />
            <ProfileItem label="Phone" value={user.phone} />
            {user.role === "Patient" && <ProfileItem label="Age" value={user.age} />}
            {user.role === "Patient" && <ProfileItem label="Gender" value={user.gender} />}
            {user.role === "Doctor" && <ProfileItem label="Specialization" value={user.specialization} />}
            {user.role === "Doctor" && <ProfileItem label="Experience" value={`${user.experience || 0} Years`} />}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ label, value }) => {
  return (
    <div
      style={{
        backgroundColor: "#f7f1e6",
        borderRadius: "8px",
        padding: "15px",
      }}
    >
      <p
        style={{
          margin: "0 0 7px",
          color: "#5f6175",
          fontSize: "14px",
        }}
      >
        {label}
      </p>
      <h3
        style={{
          margin: 0,
          color: "#2b2d42",
          fontSize: "18px",
          wordBreak: "break-word",
        }}
      >
        {value === undefined || value === null || value === "" ? "Not available" : value}
      </h3>
    </div>
  );
};

export default Profile;
