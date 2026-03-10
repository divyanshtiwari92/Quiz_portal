const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

/* ================= STUDENT LOGIN ================= */
router.post("/student/login", async (req, res) => {
  const { rollNo, password } = req.body;

  const student = await Student.findOne({ rollNo });

  if (!student) {
    return res.status(401).json({ message: "Student not found" });
  }

  if (student.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.json({
    success: true,
    role: "student",
    user: {
      id: student._id,
      name: student.name,
      rollNo: student.rollNo,
      section: student.section
    }
  });
});

/* ================= TEACHER LOGIN ================= */
router.post("/teacher/login", async (req, res) => {
  const { employeeId, password } = req.body;

  const teacher = await Teacher.findOne({ employeeId });

  if (!teacher) {
    return res.status(401).json({ message: "Teacher not found" });
  }

  if (teacher.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.json({
    success: true,
    role: "teacher",
    user: {
      id: teacher._id,
      name: teacher.name,
      employeeId: teacher.employeeId,
      department: teacher.department,
      designation: teacher.designation
    }
  });
});

module.exports = router;
