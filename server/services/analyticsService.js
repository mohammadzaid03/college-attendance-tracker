const Attendance = require("../models/Attendance");
const Student = require("../models/Student");


// 🧠 1. Get attendance percentage of a single student
const getStudentAttendancePercentage = async (studentId) => {
  const records = await Attendance.find({ studentId });

  const total = records.length;

  const present = records.filter(
    (r) => r.status === "PRESENT"
  ).length;

  if (total === 0) return 0;

  return (present / total) * 100;
};


// 📊 2. Get overall system stats (helper for controller)
const getOverallAttendanceStats = async () => {
  const students = await Student.find();

  let totalRecords = 0;
  let totalPresent = 0;

  for (let student of students) {
    const records = await Attendance.find({ studentId: student._id });

    totalRecords += records.length;
    totalPresent += records.filter(
      (r) => r.status === "PRESENT"
    ).length;
  }

  const percentage =
    totalRecords === 0 ? 0 : (totalPresent / totalRecords) * 100;

  return {
    totalStudents: students.length,
    totalPresent,
    totalRecords,
    attendancePercentage: Number(percentage.toFixed(2))
  };
};


// ⚠️ 3. Get students below threshold (e.g., 75%)
const getLowAttendanceStudents = async (threshold = 75) => {
  const students = await Student.find();

  const result = [];

  for (let student of students) {
    const percent = await getStudentAttendancePercentage(student._id);

    if (percent < threshold) {
      result.push({
        studentId: student._id,
        name: student.name,
        percentage: Number(percent.toFixed(2))
      });
    }
  }

  return result;
};


// 📚 4. Subject-wise attendance stats
const getSubjectWiseStats = async () => {
  const data = await Attendance.aggregate([
    {
      $group: {
        _id: "$subjectId",
        total: { $sum: 1 },
        present: {
          $sum: {
            $cond: [{ $eq: ["$status", "PRESENT"] }, 1, 0]
          }
        }
      }
    }
  ]);

  return data.map(item => ({
    subjectId: item._id,
    percentage: item.total === 0
      ? 0
      : Number(((item.present / item.total) * 100).toFixed(2))
  }));
};


// 📦 EXPORT ALL FUNCTIONS
module.exports = {
  getStudentAttendancePercentage,
  getOverallAttendanceStats,
  getLowAttendanceStudents,
  getSubjectWiseStats
};