const mongoose = require("mongoose");

// Academic Phase Schema
const phaseSchema = new mongoose.Schema({
  title: {
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

// Academic Calendar Schema
const academicCalendarSchema = new mongoose.Schema(
  {
    academicYear: {
      type: String,
      required: true,
    },

    semester: {
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

    workingDays: {
      type: [String],
      default: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    },

    weeklyHolidays: {
      type: [String],
      default: ["Friday", "Saturday", "Sunday"],
    },

    phases: [phaseSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AcademicCalendar",
  academicCalendarSchema
);