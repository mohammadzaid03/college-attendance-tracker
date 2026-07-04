const {
  getSemesterProgress,
  getCurrentPhase,
  getNextEvent,
} = require("./calendarService");

const {
  getOfficialAttendance,
  getPresentAbsentDays,
  getTodayStatus,
  getPersonalAttendance,
} = require("./attendanceService");

// Get Dashboard Data
const getDashboardData = async () => {
  const semesterProgress = await getSemesterProgress();

  const currentPhase = await getCurrentPhase();

  const nextEvent = await getNextEvent();

  const officialAttendance = await getOfficialAttendance();

  const presentAbsentDays = await getPresentAbsentDays();

  const todayStatus = await getTodayStatus();

  const personalAttendance = await getPersonalAttendance();

  return {
    semesterProgress,
    currentPhase,
    nextEvent,
    officialAttendance,
    presentAbsentDays,
    todayStatus,
    personalAttendance,
  };
};

module.exports = {
  getDashboardData,
};