import Doctor from "../models/Doctor.js";
import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";

router.post("/register", async(req,res)=>{
    const { fullName, email, phone, specialization, experience, availableFrom, availableTo, password } = req.body;
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
                availableFrom,
                availableTo,
                password: hashedPassword
            });
            await newDoctor.save();
            res.status(201).json({ message: "Doctor registered successfully" });
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
                res.status(200).json({message: "Login successful"});
            }
        }
    } catch (error) {
        res.status(500).json({message: "Error logging in", error});
    }
});

export default router;