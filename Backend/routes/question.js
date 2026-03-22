const express = require("express");
const router = express.Router();

const Question = require("../models/Question");

/* ================= ADD QUESTION ================= */
router.post("/add", async (req, res) => {
  try {
    const { examId, question, options, correctAnswer } = req.body;

    const newQuestion = new Question({
      examId,
      question,
      options,
      correctAnswer
    });

    await newQuestion.save();

    res.json({ success: true, question: newQuestion });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= GET QUESTIONS BY EXAM ================= */
router.get("/:examId", async (req, res) => {
  try {
    const questions = await Question.find({
      examId: req.params.examId
    });

    res.json(questions);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;