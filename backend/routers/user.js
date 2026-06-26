import userSchema from "../models/User.js";
import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";


router.post("/register", async (req, res) => {
  const { fullName, email, phone, age, gender, password } = req.body;

  try {
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userSchema({
        fullName,
        email,
        phone,
        age,
        gender,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

export default router;