const AcademicCalendar = require("../models/AcademicCalendar");

// Create Academic Calendar
const createAcademicCalendar = async (req, res) => {
  try {
    const academicCalendar = await AcademicCalendar.create(req.body);

    res.status(201).json({
      success: true,
      message: "Academic Calendar created successfully",
      data: academicCalendar,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAcademicCalendar,
};