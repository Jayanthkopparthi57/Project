const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Document = require("../models/Document.js");

const router = express.Router();
const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("document"), async (req, res) => {
  const { userId } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please select a document to upload" });
    }

    if (!userId) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: "User id is required" });
    }

    const document = new Document({
      user: userId,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: `/uploads/${req.file.filename}`,
      mimeType: req.file.mimetype,
      size: req.file.size,
    });

    await document.save();

    res.status(201).json({
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading document", error: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const documents = await Document.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching documents", error: error.message });
  }
});

module.exports = router;
