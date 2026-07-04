const mongoose = require("mongoose");

// ===============================
// Holiday Schema
// ===============================
const holidaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  type: {
    type: String,
    enum: ["National", "Festival", "College"],
    default: "College",
  },
});

// ===============================
// Academic Phase Schema
// ===============================
const phaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },
});

// ===============================
// Academic Calendar Schema
// ===============================
const academicCalendarSchema = new mongoose.Schema(
  {
    // Academic Year
    academicYear: {
      type: String,
      required: true,
    },

    // Semester
    semester: {
      type: String,
      required: true,
    },

    // Semester Start
    startDate: {
      type: Date,
      required: true,
    },

    // Semester End
    endDate: {
      type: Date,
      required: true,
    },

    // College Working Days
    workingDays: {
      type: [String],
      default: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    },

    // Weekly Holidays
    weeklyHolidays: {
      type: [String],
      default: ["Friday", "Saturday", "Sunday"],
    },

    // National / Festival / College Holidays
    holidays: [holidaySchema],

    // Academic Phases
    phases: [phaseSchema],

    // Current Active Calendar
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AcademicCalendar",
  academicCalendarSchema
);