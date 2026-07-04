const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analyticsController");


// 📊 OVERALL DASHBOARD STATS
router.get("/overview", analyticsController.getOverallStats);


// ⚠️ LOW ATTENDANCE STUDENTS
router.get("/low-attendance", analyticsController.getLowAttendanceStudents);


// 📚 SUBJECT WISE ANALYTICS
router.get("/subjects", analyticsController.getSubjectStats);


// 👨‍🎓 SINGLE STUDENT ANALYTICS
router.get("/student/:id", analyticsController.getStudentStats);


module.exports = router;