const Attendance = require("../models/Attendance");

// ===============================
// Create Attendance
// ===============================
const createAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);

    res.status(201).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get All Attendance
// ===============================
const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("studentId")
      .populate("subjects.subjectId");

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Attendance By Date
// ===============================
const getAttendanceByDate = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({
      date: new Date(req.params.date),
    })
      .populate("studentId")
      .populate("subjects.subjectId");

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Attendance
// ===============================
const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findOneAndUpdate(
      {
        date: new Date(req.params.date),
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Attendance
// ===============================
const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findOneAndDelete({
      date: new Date(req.params.date),
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceByDate,
  updateAttendance,
  deleteAttendance,
};