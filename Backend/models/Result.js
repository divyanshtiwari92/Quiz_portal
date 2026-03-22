const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam"
  },
  score: Number,
  total: Number
}, { timestamps: true });

module.exports = mongoose.model("Result", resultSchema);