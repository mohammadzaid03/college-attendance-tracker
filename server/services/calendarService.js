const AcademicCalendar = require("../models/AcademicCalendar");

// Get Active Academic Calendar
const getActiveCalendar = async () => {
  return await AcademicCalendar.findOne({ isActive: true });
};

// Get Semester Progress
const getSemesterProgress = async () => {
  const calendar = await getActiveCalendar();

  if (!calendar) {
    throw new Error("Active Academic Calendar not found");
  }

  const today = new Date();

  const semesterStart = new Date(calendar.startDate);
  const semesterEnd = new Date(calendar.endDate);

  const totalDays = Math.ceil(
    (semesterEnd - semesterStart) / (1000 * 60 * 60 * 24)
  );

  const completedDays = Math.max(
    0,
    Math.ceil((today - semesterStart) / (1000 * 60 * 60 * 24))
  );

  const percentage = Math.min(
    100,
    Math.round((completedDays / totalDays) * 100)
  );

  return {
    semester: calendar.semester,
    academicYear: calendar.academicYear,
    totalDays,
    completedDays,
    remainingDays: Math.max(0, totalDays - completedDays),
    percentage,
  };
};

// Get Current Academic Phase
const getCurrentPhase = async () => {
  const calendar = await getActiveCalendar();

  if (!calendar) {
    throw new Error("Active Academic Calendar not found");
  }

  const today = new Date();

  const currentPhase = calendar.phases.find((phase) => {
    return (
      today >= new Date(phase.startDate) &&
      today <= new Date(phase.endDate)
    );
  });

  if (!currentPhase) {
    return {
      name: "No Active Phase",
      startDate: null,
      endDate: null,
    };
  }

  return {
    name: currentPhase.name,
    startDate: currentPhase.startDate,
    endDate: currentPhase.endDate,
  };
};

// Get Next Academic Event
const getNextEvent = async () => {
  const calendar = await getActiveCalendar();

  if (!calendar) {
    throw new Error("Active Academic Calendar not found");
  }

  const today = new Date();

  const upcomingPhases = calendar.phases
    .filter((phase) => new Date(phase.startDate) > today)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  if (upcomingPhases.length === 0) {
    return {
      name: "Semester Completed",
      startDate: null,
      daysLeft: 0,
    };
  }

  const nextPhase = upcomingPhases[0];

  const daysLeft = Math.ceil(
    (new Date(nextPhase.startDate) - today) /
      (1000 * 60 * 60 * 24)
  );

  return {
    name: nextPhase.name,
    startDate: nextPhase.startDate,
    daysLeft,
  };
};

module.exports = {
  getActiveCalendar,
  getSemesterProgress,
  getCurrentPhase,
  getNextEvent,
};