import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [appointment, setAppointment] = useState({
    appointmentDate: "",
    reason: "",
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctorRes = await axios.get(`http://localhost:5000/doctors/${id}`);
        const appointmentRes = await axios.get(`http://localhost:5000/appointments/doctor/${id}`);
        setDoctor(doctorRes.data);
        setDoctorAppointments(appointmentRes.data);
      } catch {
        setMessage("Unable to load doctor details");
        setMessageType("error");
      }
      setLoading(false);
    };

    if (id) {
      fetchDoctor();
    }
  }, [id]);

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });

    if (e.target.name === "appointmentDate" && e.target.value) {
      setSelectedDate(e.target.value.slice(0, 10));
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setAppointment({ ...appointment, appointmentDate: "" });
  };

  const chooseSlot = (slot) => {
    if (isSlotBooked(slot)) {
      showMessage("Appointment request cancelled because this doctor is already booked for this time", "error");
      return;
    }

    setAppointment({ ...appointment, appointmentDate: `${selectedDate}T${slot}` });
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

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    saveNotification(text, type);
  };

  const bookAppointment = async (e) => {
    e.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser || loggedInUser.role !== "Patient") {
      showMessage("Please login as a patient to book an appointment", "error");
      navigate("/login");
      return;
    }

    setBooking(true);
    try {
      const res = await axios.post("http://localhost:5000/appointments/book", {
        doctorId: id,
        patientId: loggedInUser.id,
        appointmentDate: appointment.appointmentDate,
        reason: appointment.reason,
      });
      showMessage(res.data.message, "success");
      setAppointment({
        appointmentDate: "",
        reason: "",
      });
      const appointmentRes = await axios.get(`http://localhost:5000/appointments/doctor/${id}`);
      setDoctorAppointments(appointmentRes.data);
      navigate("/Appointments");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Appointment booking failed";
      showMessage(errorMessage, "error");
    }
    setBooking(false);
  };

  const formatDateKey = (date) => {
    const value = new Date(date);
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTimeKey = (date) => {
    const value = new Date(date);
    const hours = String(value.getHours()).padStart(2, "0");
    const minutes = String(value.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const isSlotBooked = (slot) => {
    return doctorAppointments.some((item) => {
      return item.status !== "Cancelled" && formatDateKey(item.appointmentDate) === selectedDate && formatTimeKey(item.appointmentDate) === slot;
    });
  };

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={centerBoxStyle}>Loading doctor details...</div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div style={pageStyle}>
        <div style={centerBoxStyle}>
          <p style={{ margin: "0 0 16px", color: "#2b2d42", fontWeight: "800" }}>Doctor not found.</p>
          <Link to="/FindDoctor" style={linkButtonStyle}>Back to Doctors</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
        }}
      >
        <Link
          to="/FindDoctor"
          style={{
            display: "inline-block",
            marginBottom: "18px",
            color: "#2b2d42",
            textDecoration: "none",
            fontWeight: "800",
          }}
        >
          Back to Doctors
        </Link>

        {message && (
          <div
            style={{
              backgroundColor: messageType === "success" ? "#ffd8a8" : "#ffffff",
              color: "#2b2d42",
              padding: "14px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: "800",
            }}
          >
            {message}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "22px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "26px",
              boxShadow: "0 14px 34px rgba(43,45,66,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                flexWrap: "wrap",
                marginBottom: "22px",
              }}
            >
              <div
                style={{
                  width: "86px",
                  height: "86px",
                  borderRadius: "50%",
                  backgroundColor: "#2b2d42",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "38px",
                  fontWeight: "800",
                }}
              >
                {doctor.fullName?.charAt(0).toUpperCase()}
              </div>

              <div>
                <p
                  style={{
                    margin: "0 0 6px",
                    color: "#ff9f1c",
                    fontWeight: "800",
                    fontSize: "14px",
                  }}
                >
                  Doctor Profile
                </p>
                <h1
                  style={{
                    margin: "0 0 7px",
                    color: "#2b2d42",
                    fontSize: "32px",
                    lineHeight: "1.15",
                  }}
                >
                  {doctor.fullName}
                </h1>
                <p
                  style={{
                    margin: 0,
                    color: "#5f6175",
                    fontSize: "17px",
                    fontWeight: "700",
                  }}
                >
                  {doctor.specialization}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "12px",
              }}
            >
              <Info label="Email" value={doctor.email} />
              <Info label="Phone" value={doctor.phone} />
              <Info label="Experience" value={`${doctor.experience || 0} Years`} />
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "26px",
              boxShadow: "0 14px 34px rgba(43,45,66,0.08)",
            }}
          >
            <p
              style={{
                margin: "0 0 6px",
                color: "#ff9f1c",
                fontWeight: "800",
                fontSize: "14px",
              }}
            >
              Appointment Request
            </p>
            <h2
              style={{
                margin: "0 0 18px",
                color: "#2b2d42",
                fontSize: "26px",
              }}
            >
              Book a Visit
            </h2>

            <form onSubmit={bookAppointment}>
              <div style={{ marginBottom: "15px" }}>
                <label style={labelStyle}>Choose Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={labelStyle}>Timings</label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {timeSlots.map((slot) => {
                    const booked = isSlotBooked(slot);
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => chooseSlot(slot)}
                        style={{
                          padding: "10px 12px",
                          border: "none",
                          borderRadius: "8px",
                          backgroundColor: booked ? "#e63946" : "#2a9d8f",
                          color: "#ffffff",
                          cursor: booked ? "not-allowed" : "pointer",
                          fontWeight: "800",
                          opacity: appointment.appointmentDate === `${selectedDate}T${slot}` ? 1 : 0.9,
                          boxShadow: appointment.appointmentDate === `${selectedDate}T${slot}` ? "0 0 0 3px rgba(43,45,66,0.18)" : "none",
                        }}
                      >
                        {slot} {booked ? "Booked" : "Open"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={labelStyle}>Date and Time</label>
                <input
                  type="datetime-local"
                  name="appointmentDate"
                  value={appointment.appointmentDate}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Reason</label>
                <textarea
                  name="reason"
                  value={appointment.reason}
                  onChange={handleChange}
                  placeholder="Tell the doctor why you are visiting"
                  rows="5"
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "120px",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={booking}
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor: booking ? "#ffd8a8" : "#ff9f1c",
                  color: "#2b2d42",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  cursor: booking ? "not-allowed" : "pointer",
                  fontWeight: "800",
                }}
              >
                {booking ? "Booking..." : "Book Appointment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => {
  return (
    <div
      style={{
        backgroundColor: "#f7f1e6",
        borderRadius: "8px",
        padding: "14px",
      }}
    >
      <p style={{ margin: "0 0 5px", color: "#5f6175", fontSize: "14px" }}>{label}</p>
      <p style={{ margin: 0, color: "#2b2d42", fontWeight: "800", wordBreak: "break-word" }}>{value || "Not available"}</p>
    </div>
  );
};

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#f7f1e6",
  padding: "28px 16px 42px",
};

const centerBoxStyle = {
  maxWidth: "650px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "30px",
  textAlign: "center",
  boxShadow: "0 14px 34px rgba(43,45,66,0.08)",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#2b2d42",
  fontWeight: "800",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  fontSize: "15px",
  boxSizing: "border-box",
  backgroundColor: "#f7f1e6",
  color: "#2b2d42",
  outline: "none",
};

const linkButtonStyle = {
  display: "inline-block",
  padding: "12px 16px",
  backgroundColor: "#ff9f1c",
  color: "#2b2d42",
  textDecoration: "none",
  borderRadius: "8px",
  fontWeight: "800",
};

export default DoctorDetails;
