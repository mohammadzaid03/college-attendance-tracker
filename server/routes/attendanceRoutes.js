const express = require("express");

const router = express.Router();

const {
  createAttendance,
  getAllAttendance,
  getAttendanceByDate,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

// Create Attendance & Get All Attendance
router
  .route("/")
  .post(createAttendance)
  .get(getAllAttendance);

// Get, Update & Delete Attendance by Date
router
  .route("/:date")
  .get(getAttendanceByDate)
  .put(updateAttendance)
  .delete(deleteAttendance);

module.exports = router;