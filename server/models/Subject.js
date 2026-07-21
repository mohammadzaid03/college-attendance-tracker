const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      trim: true,
    },

    subjectCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    branch: {
      type: String,
      required: true,
      trim: true,
    },

    semester: {
      type: String,
      required: true,
      trim: true,
    },

    credits: {
      type: Number,
      required: true,
      min: 0,
    },

    facultyName: {
      type: String,
      required: true,
      trim: true,
    },

    subjectType: {
      type: String,
      enum: ["Theory", "Lab"],
      default: "Theory",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    subjectLevel: [
      {
        type: String,
        enum: ["Pass", "Score", "Skill"],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subject", subjectSchema);