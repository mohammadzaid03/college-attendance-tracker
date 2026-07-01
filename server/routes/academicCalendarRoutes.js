const express = require("express");

const router = express.Router();

const {
  createAcademicCalendar,
} = require("../controllers/academicCalendarController");

// Create Academic Calendar
router.post("/", createAcademicCalendar);

module.exports = router;