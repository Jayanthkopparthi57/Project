const User = require("../models/User.js");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");


router.post("/signup", async (req, res) => {
  const { fullName, email, phone, age, gender, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Full name, email and password are required" });
    }

    if (gender && !["Male", "Female", "Other"].includes(gender)) {
      return res.status(400).json({ message: "Please select a valid gender" });
    }

    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone,
      age: age ? Number(age) : undefined,
      gender: gender || undefined,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        age: newUser.age,
        gender: newUser.gender,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    if (error.code === 11000) {
      return res.status(400).json({ message: "User already exists" });
    }

    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        age: user.age,
        gender: user.gender,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -__v");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
});

module.exports = router;
