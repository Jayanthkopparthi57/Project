const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./db.js");

const userRoutes = require("./routers/user.js");
const doctorRoutes = require("./routers/doctor.js");
const appointmentRoutes = require("./routers/appointments.js");
const documentRoutes = require("./routers/documents.js");

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/patients", userRoutes);
app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/documents", documentRoutes);

app.get("/", (req, res) => {
  res.send("Doctor Appointment Booking API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
