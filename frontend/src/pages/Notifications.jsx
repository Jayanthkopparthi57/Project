import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    const savedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];

    if (user?.role === "Doctor") {
      try {
        const res = await axios.get(`http://localhost:5000/appointments/doctor/${user.id}`);
        const requestNotifications = res.data.map((appointment) => ({
          id: appointment._id,
          type: "success",
          message: `${appointment.patient?.fullName} requested an appointment on ${new Date(appointment.appointmentDate).toLocaleString()}`,
          time: appointment.createdAt,
        }));
        setNotifications([...requestNotifications, ...savedNotifications]);
      } catch {
        setNotifications(savedNotifications);
      }
    } else {
      setNotifications(savedNotifications);
    }
  };

  const clearNotifications = () => {
    localStorage.removeItem("notifications");
    setNotifications([]);
  };

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: "850px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "15px", flexWrap: "wrap", marginBottom: "22px" }}>
          <div>
            <h1 style={titleStyle}>Notifications</h1>
            <p style={textStyle}>{user?.role === "Doctor" ? "Appointment requests will appear here." : "Your appointment and document updates will appear here."}</p>
          </div>

          {notifications.length > 0 && (
            <button onClick={clearNotifications} style={buttonStyle}>Clear All</button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div style={boxStyle}>No notifications yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  backgroundColor: notification.type === "success" ? "#ffffff" : "#ffd8a8",
                  color: "#2b2d42",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 8px 22px rgba(43,45,66,0.1)",
                }}
              >
                <h3 style={{ margin: "0 0 7px", fontSize: "18px" }}>{notification.type === "success" ? "Update" : "Alert"}</h3>
                <p style={{ margin: "0 0 8px", fontWeight: "600" }}>{notification.message}</p>
                {notification.time && <p style={textStyle}>{new Date(notification.time).toLocaleString()}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#f7f1e6",
  padding: "28px 16px 42px",
};

const titleStyle = {
  color: "#2b2d42",
  margin: "0 0 8px",
  fontSize: "34px",
};

const textStyle = {
  color: "#5f6175",
  margin: 0,
  fontSize: "16px",
};

const boxStyle = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "8px",
  boxShadow: "0 8px 22px rgba(43,45,66,0.1)",
};

const buttonStyle = {
  padding: "11px 16px",
  backgroundColor: "#ff9900",
  color: "#2b2d42",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "800",
};

export default Notifications;
