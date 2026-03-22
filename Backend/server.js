const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const connectDB = require("./config/db");
const examRoutes = require("./routes/exam");
const questionRoutes = require("./routes/question");
const resultRoutes = require("./routes/result");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= DB ================= */
connectDB();

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/result", resultRoutes);

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("🚀 Server running");
});
app.get("/test", (req, res) => {
  res.send("Test working");
});
/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});