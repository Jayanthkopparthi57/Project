import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(savedUser);

    if (savedUser?.role === "Doctor") {
      getDoctorAppointments(savedUser.id);
    }

    if (savedUser?.role === "Patient") {
      getPatientAppointments(savedUser.id);
    }
  }, []);

  const getPatientAppointments = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/appointments/patient/${id}`);
      setAppointments(res.data);
    } catch {
      setMessage("Unable to load appointments");
    }
  };

  const getDoctorAppointments = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/appointments/doctor/${id}`);
      setAppointments(res.data);
    } catch {
      setMessage("Unable to load appointment requests");
    }
  };

  const saveNotification = (text, type) => {
    const oldNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    const newNotification = {
      id: Date.now(),
      message: text,
      type: type,
      time: new Date().toLocaleString(),
    };
    localStorage.setItem("notifications", JSON.stringify([newNotification, ...oldNotifications]));
  };

  const updateStatus = async (appointment, status) => {
    try {
      const res = await axios.put(`http://localhost:5000/appointments/${appointment._id}/status`, { status });
      setMessage(res.data.message);
      saveNotification(`${appointment.patient?.fullName}'s appointment is ${status}`, "success");
      getDoctorAppointments(user.id);
    } catch {
      setMessage("Unable to update appointment");
      saveNotification("Unable to update appointment", "error");
    }
  };

  if (!user) {
    return (
      <div style={pageStyle}>
        <div style={boxStyle}>
          <h2>Appointments</h2>
          <p>Please login to view appointments.</p>
          <Link to="/login" style={buttonStyle}>Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={titleStyle}>{user.role === "Doctor" ? "Appointment Requests" : "My Appointments"}</h1>
        <p style={textStyle}>{user.role === "Doctor" ? "Patients who booked you will appear here." : "Your booked appointments will appear here."}</p>

        {message && <div style={messageStyle}>{message}</div>}

        {appointments.length === 0 ? (
          <div style={boxStyle}>No appointments found.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {appointments.map((appointment) => (
              <div key={appointment._id} style={cardStyle}>
                {user.role === "Doctor" ? (
                  <div>
                    <h2 style={cardTitleStyle}>{appointment.patient?.fullName}</h2>
                    <p style={textStyle}>Email: {appointment.patient?.email}</p>
                    <p style={textStyle}>Phone: {appointment.patient?.phone}</p>
                    <p style={textStyle}>Age: {appointment.patient?.age || "Not available"}</p>
                    <p style={textStyle}>Gender: {appointment.patient?.gender || "Not available"}</p>
                    <p style={textStyle}>Date: {new Date(appointment.appointmentDate).toLocaleString()}</p>
                    <p style={textStyle}>Reason: {appointment.reason || "Not available"}</p>
                    <p style={textStyle}>Status: {appointment.status}</p>

                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "12px" }}>
                      <Link to={`/patients/${appointment.patient?._id}`} style={buttonStyle}>View Profile</Link>
                      <button onClick={() => updateStatus(appointment, "Confirmed")} style={greenButtonStyle}>Confirm</button>
                      <button onClick={() => updateStatus(appointment, "Cancelled")} style={redButtonStyle}>Cancel</button>
                      <button onClick={() => updateStatus(appointment, "Completed")} style={buttonStyle}>Complete</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 style={cardTitleStyle}>{appointment.doctor?.fullName}</h2>
                    <p style={textStyle}>Specialization: {appointment.doctor?.specialization}</p>
                    <p style={textStyle}>Date: {new Date(appointment.appointmentDate).toLocaleString()}</p>
                    <p style={textStyle}>Reason: {appointment.reason || "Not available"}</p>
                    <p style={textStyle}>Status: {appointment.status}</p>
                  </div>
                )}
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
  background: "#f7f1e6",
  padding: "30px 16px",
};

const titleStyle = {
  margin: "0 0 8px",
  color: "#2b2d42",
  fontSize: "34px",
};

const textStyle = {
  margin: "6px 0",
  color: "#5f6175",
};

const boxStyle = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "8px",
  boxShadow: "0 8px 22px rgba(43,45,66,0.1)",
};

const cardStyle = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 8px 22px rgba(43,45,66,0.1)",
};

const cardTitleStyle = {
  margin: "0 0 10px",
  color: "#2b2d42",
};

const buttonStyle = {
  display: "inline-block",
  padding: "10px 14px",
  background: "#ff9f1c",
  color: "#2b2d42",
  border: "none",
  borderRadius: "8px",
  textDecoration: "none",
  cursor: "pointer",
  fontWeight: "800",
};

const greenButtonStyle = {
  ...buttonStyle,
  background: "#2a9d8f",
  color: "#ffffff",
};

const redButtonStyle = {
  ...buttonStyle,
  background: "#e63946",
  color: "#ffffff",
};

const messageStyle = {
  ...boxStyle,
  marginBottom: "15px",
  fontWeight: "800",
};

export default Appointments;
