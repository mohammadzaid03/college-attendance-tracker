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

// Get Student by Hall Ticket
router
  .route("/:hallTicketNo")
  .get(getStudentByHallTicket);

// Update Student by MongoDB _id
router
  .route("/update/:id")
  .put(updateStudent);

// Delete Student by MongoDB _id
router
  .route("/:id")
  .delete(deleteStudent);

module.exports = router;