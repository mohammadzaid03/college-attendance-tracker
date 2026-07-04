const Attendance = require("../models/Attendance");

// Get Official Attendance Percentage
const getOfficialAttendance = async () => {
  const attendance = await Attendance.find();

  const totalDays = attendance.length;

  const presentDays = attendance.filter(
    (day) => day.overallStatus === "Present"
  ).length;

  const percentage =
    totalDays === 0
      ? 0
      : Math.round((presentDays / totalDays) * 100);

  return {
    totalDays,
    presentDays,
    percentage,
  };
};

// Get Present & Absent Days
const getPresentAbsentDays = async () => {
  const attendance = await Attendance.find();

  const totalDays = attendance.length;

  const presentDays = attendance.filter(
    (day) => day.overallStatus === "Present"
  ).length;

  const absentDays = attendance.filter(
    (day) => day.overallStatus === "Absent"
  ).length;

  return {
    totalDays,
    presentDays,
    absentDays,
  };
};

// Get Today's Attendance Status
const getTodayStatus = async () => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const attendance = await Attendance.findOne({
    date: today,
  });

  if (!attendance) {
    return {
      status: "Not Marked",
    };
  }

  return {
    status: attendance.overallStatus,
  };
};

// Get Personal Attendance
const getPersonalAttendance = async () => {
  const attendance = await Attendance.find();

  const presentDays = attendance.filter(
    (day) => day.overallStatus === "Present"
  ).length;

  const targetDays = 92;

  const percentage = Math.min(
    100,
    Math.round((presentDays / targetDays) * 100)
  );

  return {
    targetDays,
    presentDays,
    percentage,
  };
};


module.exports = {
  getOfficialAttendance,
  getPresentAbsentDays,
  getTodayStatus,
  getPersonalAttendance,
};