const express = require("express");

const router = express.Router();

const {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

// Create Attendance & Get All Attendance
router
  .route("/")
  .post(createAttendance)
  .get(getAllAttendance);

// Get, Update & Delete Attendance by ID
router
  .route("/:id")
  .get(getAttendanceById)
  .put(updateAttendance)
  .delete(deleteAttendance);

module.exports = router;