const express = require("express");

const router = express.Router();

const {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  saveSubjectAttendance,
  getSubjectAttendanceSummary,
  getAttendanceHistory,
  getPersonalAttendance,
} = require("../controllers/attendanceController");

// Create Attendance & Get All Attendance
router
  .route("/")
  .post(createAttendance)
  .get(getAllAttendance);

// Subject Summary
router.get(
  "/subject-summary",
  getSubjectAttendanceSummary
);

// Save Subject Attendance
router.post(
  "/subject",
  saveSubjectAttendance
);

// Attendance History
router.get(
  "/history/:subjectId",
  getAttendanceHistory
);

router.get("/personal/:studentId", 
  getPersonalAttendance);

// Get, Update & Delete Attendance
router
  .route("/:id")
  .get(getAttendanceById)
  .put(updateAttendance)
  .delete(deleteAttendance);

module.exports = router;

