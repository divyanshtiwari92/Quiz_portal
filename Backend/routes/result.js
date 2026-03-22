
const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

/* ================= SAVE RESULT ================= */
router.post("/save", async (req, res) => {
  try {
    const { studentId, examId, score, total } = req.body;

    // 🔥 prevent duplicate attempt
    const existing = await Result.findOne({ studentId, examId });

    if (existing) {
      return res.json({ message: "Already attempted" });
    }

    const result = new Result({
      studentId,
      examId,
      score,
      total
    });

    await result.save();

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= GET BY STUDENT ================= */
router.get("/:studentId", async (req, res) => {
  try {
    const results = await Result.find({
      studentId: req.params.studentId
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= GET ALL (FOR TEACHER) ================= */
router.get("/", async (req, res) => {
  try {
    const results = await Result.find()
      .populate("studentId")
      .populate("examId");

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;