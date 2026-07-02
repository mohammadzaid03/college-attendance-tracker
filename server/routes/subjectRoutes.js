const express = require("express");

const router = express.Router();

const {
  createSubject,
  getAllSubjects,
  getSubjectByCode,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");

// Create Subject & Get All Subjects
router
  .route("/")
  .post(createSubject)
  .get(getAllSubjects);

// Get, Update & Delete Subject by Subject Code
router
  .route("/:subjectCode")
  .get(getSubjectByCode)
  .put(updateSubject)
  .delete(deleteSubject);

module.exports = router;