const express = require("express");
const cors = require("cors");

const academicCalendarRoutes = require("./routes/academicCalendarRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/calendar", academicCalendarRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 College Attendance Tracker API is running...");
});

module.exports = app;