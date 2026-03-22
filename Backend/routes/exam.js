const express = require("express");
const router = express.Router();

const Exam = require("../models/Exam");

/* ================= CREATE EXAM ================= */
router.post("/create", async (req, res) => {
  try {
    const { subject, duration, section, teacherId } = req.body;

    const newExam = new Exam({
      subject,
      duration,
      section,
      createdBy: teacherId
    });

    await newExam.save();

    res.json({ success: true, message: "Exam created", exam: newExam });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= GET ALL EXAMS ================= */
router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;