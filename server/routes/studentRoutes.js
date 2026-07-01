const express = require("express");

const router = express.Router();

const {
  createStudent,
  getAllStudents,
  getStudentByHallTicket,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// Create Student & Get All Students
router
  .route("/")
  .post(createStudent)
  .get(getAllStudents);

// Get, Update & Delete Student by Hall Ticket
router
  .route("/:hallTicketNo")
  .get(getStudentByHallTicket)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;