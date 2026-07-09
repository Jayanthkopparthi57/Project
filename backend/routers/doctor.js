const Doctor = require("../models/Doctor.js");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const doctorProjection = "-password -__v";

router.get("/", async (req, res) => {
    try {
        const doctors = await Doctor.find().select(doctorProjection).sort({ fullName: 1 });
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching doctors", error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).select(doctorProjection);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Error fetching doctor", error: error.message });
    }
});

router.post("/register", async(req,res)=>{
    const { fullName, email, phone, specialization, experience, password } = req.body;
    try{
        const existingDoctor = await Doctor.findOne({email});
        if(existingDoctor){
            return res.status(400).json({message: "Doctor already exists"});
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const newDoctor = new Doctor({
                fullName,
                email,
                phone,
                specialization,
                experience,
                password: hashedPassword
            });
            await newDoctor.save();
            res.status(201).json({
                message: "Doctor registered successfully",
                doctor: {
                    id: newDoctor._id,
                    fullName: newDoctor.fullName,
                    email: newDoctor.email,
                    specialization: newDoctor.specialization,
                    experience: newDoctor.experience
                }
            });
        }
    } catch (error) {
        res.status(500).json({message: "Error registering doctor", error});
    }
});

router.post("/login", async(req,res)=>{
    const { email, password } = req.body;
    try{
        const doctor = await Doctor.findOne({email});
        if(!doctor){
            return res.status(404).json({message: "Doctor not found"});
        }
        else{
            const match = await bcrypt.compare(password, doctor.password);
            if(!match){
                return res.status(400).json({message: "Invalid credentials"});
            }
            else{
                res.status(200).json({
                    message: "Login successful",
                    doctor: {
                        id: doctor._id,
                        fullName: doctor.fullName,
                        email: doctor.email,
                        specialization: doctor.specialization,
                        experience: doctor.experience,
                        availableFrom: doctor.availableFrom,
                        availableTo: doctor.availableTo
                    }
                });
            }
        }
    } catch (error) {
        res.status(500).json({message: "Error logging in", error});
    }
});

module.exports = router;
