import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./db.js";

import userRoutes from "./routers/user.js";
import doctorRoutes from "./routers/doctor.js";
import appointmentRoutes from "./routers/appointments.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/doctors", doctorRoutes);
app.use("/appoinments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("Doctor Appointment Booking API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});