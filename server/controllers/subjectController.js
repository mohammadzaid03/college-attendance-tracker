const Subject = require("../models/Subject");

// ===============================
// Create Subject
// ===============================
const createSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get All Subjects
// ===============================
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();

    res.status(200).json({
      success: true,
      count: subjects.length,
      data: subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Subject By Subject Code
// ===============================
const getSubjectByCode = async (req, res) => {
  try {
    const subject = await Subject.findOne({
      subjectCode: req.params.subjectCode.toUpperCase(),
    });

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      data: subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Subject
// ===============================
const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findOneAndUpdate(
      {
        subjectCode: req.params.subjectCode.toUpperCase(),
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      data: subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Subject
// ===============================
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findOneAndDelete({
      subjectCode: req.params.subjectCode.toUpperCase(),
    });

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectByCode,
  updateSubject,
  deleteSubject,
};