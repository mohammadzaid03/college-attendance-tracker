const analyticsService = require("../services/analyticsService");


// 📊 1. OVERALL DASHBOARD STATS
const getOverallStats = async (req, res) => {
  try {
    const data = await analyticsService.getOverallAttendanceStats();

    res.status(200).json({
      success: true,
      message: "Overall analytics fetched successfully",
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch overall stats",
      error: error.message
    });
  }
};


// ⚠️ 2. LOW ATTENDANCE STUDENTS
const getLowAttendanceStudents = async (req, res) => {
  try {
    const threshold = req.query.threshold || 75;

    const data = await analyticsService.getLowAttendanceStudents(threshold);

    res.status(200).json({
      success: true,
      message: "Low attendance students fetched successfully",
      threshold,
      count: data.length,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch low attendance students",
      error: error.message
    });
  }
};


// 📚 3. SUBJECT WISE STATS
const getSubjectStats = async (req, res) => {
  try {
    const data = await analyticsService.getSubjectWiseStats();

    res.status(200).json({
      success: true,
      message: "Subject wise stats fetched successfully",
      count: data.length,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subject stats",
      error: error.message
    });
  }
};


// 👨‍🎓 4. SINGLE STUDENT ANALYTICS
const getStudentStats = async (req, res) => {
  try {
    const studentId = req.params.id;

    const percentage =
      await analyticsService.getStudentAttendancePercentage(studentId);

    res.status(200).json({
      success: true,
      message: "Student stats fetched successfully",
      data: {
        studentId,
        attendancePercentage: Number(percentage.toFixed(2))
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch student stats",
      error: error.message
    });
  }
};


// 📦 EXPORT ALL CONTROLLERS
module.exports = {
  getOverallStats,
  getLowAttendanceStudents,
  getSubjectStats,
  getStudentStats
};