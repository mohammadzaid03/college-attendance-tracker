
const Attendance = require("../models/Attendance");

// Get Official Attendance Percentage
const getOfficialAttendance = async () => {
  const attendance = await Attendance.find();

  const totalDays = attendance.length;

  const presentDays = attendance.filter(
    (day) => day.status === "Present"
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
    (day) => day.status === "Present"
  ).length;

  const absentDays = attendance.filter(
    (day) => day.status === "Absent"
  ).length;

  return {
    totalDays,
    presentDays,
    absentDays,
  };
};


// Get Today's Attendance Status
const getTodayStatus = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const attendance = await Attendance.findOne({
    date: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });

  if (!attendance) {
    return {
      status: "Not Marked",
    };
  }

  return {
    status: attendance.status,
  };
};


// Get Personal Attendance
const getPersonalAttendance = async () => {
  const attendance = await Attendance.find();

  const totalDays = attendance.length;

  const presentDays = attendance.filter(
    (day) => day.status === "Present"
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


module.exports = {
  getOfficialAttendance,
  getPresentAbsentDays,
  getTodayStatus,
  getPersonalAttendance,
};

