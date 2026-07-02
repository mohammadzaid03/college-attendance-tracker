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