import express from "express";
import Appointment from "../models/Appointments.js";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/book", async (req, res) => {
  const { doctorId, patientId, appointmentDate, reason } = req.body;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const patient = await User.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate: new Date(appointmentDate),
      status: { $ne: "Cancelled" }
    });

    if (existingAppointment) {
      return res.status(400).json({ message: "Appointment slot already booked" });
    }

    const appointment = new Appointment({
      doctor: doctorId,
      patient: patientId,
      appointmentDate,
      reason
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });
  } catch (error) {
    res.status(500).json({
      message: "Error booking appointment",
      error: error.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "fullName specialization")
      .populate("patient", "fullName email");

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.params.doctorId
    }).populate("patient", "fullName phone");

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/patient/:patientId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.params.patientId
    }).populate("doctor", "fullName specialization");

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id/status", async (req, res) => {
  const { status } = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment status updated",
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;