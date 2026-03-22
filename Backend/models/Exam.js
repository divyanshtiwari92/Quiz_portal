const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  }
}, { timestamps: true });

module.exports = mongoose.model("Exam", examSchema);