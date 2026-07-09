import React, { useEffect, useState } from "react";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/appointments/patient/${user.id}`
        );
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div style={{ padding: "30px" ,height:"100vh"}}>
      <h2>My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <p>
              <strong>Doctor:</strong>{" "}
              {appointment.doctor?.fullName}
            </p>

            <p>
              <strong>Specialization:</strong>{" "}
              {appointment.doctor?.specialization}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                appointment.appointmentDate
              ).toLocaleString()}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {appointment.status}
            </p>

            {appointment.reason && (
              <p>
                <strong>Reason:</strong>{" "}
                {appointment.reason}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Appointments;