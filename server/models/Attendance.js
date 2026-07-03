const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    // Attendance Date
    date: {
      type: Date,
      required: true,
    },

    // Day Name (Monday, Tuesday...)
    day: {
      type: String,
      required: true,
    },

    // Student Reference
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    // Overall Attendance Status
    overallStatus: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },

    // Subject-wise Attendance
    subjects: [
      {
        subjectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
          required: true,
        },

        status: {
          type: String,
          enum: ["Present", "Absent"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);