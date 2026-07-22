const Attendance = require("../models/Attendance");
const Subject = require("../models/Subject");

// ===============================
// Create Attendance
// ===============================
const createAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);

    res.status(201).json({
      success: true,
      message: "Attendance created successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get All Attendance
// ===============================
const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("student")
      .populate("subject");

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Attendance By ID
// ===============================
const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate("student")
      .populate("subject");

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Attendance
// ===============================
const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
    runValidators: true,
      }
    );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      data: attendance,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Attendance
// ===============================
const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Subject Attendance Summary
// =======================================

const getSubjectAttendanceSummary = async (req, res) => {
  try {
    const subjects = await Subject.find();

    const summary = await Promise.all(
      subjects.map(async (subject) => {
        const conducted = await Attendance.countDocuments({
          subject: subject._id,
        });

        const attended = await Attendance.countDocuments({
          subject: subject._id,
          status: "Present",
        });

        const percentage =
          conducted === 0
            ? 0
            : Number(
                ((attended / conducted) * 100).toFixed(2)
              );

        let status = "Low";

        if (percentage >= 90) {
          status = "Excellent";
        } else if (percentage >= 75) {
          status = "Good";
        } else if (percentage >= 65) {
          status = "Average";
        }

        return {
  _id: subject._id,

  subjectName: subject.subjectName,
  subjectCode: subject.subjectCode,

  branch: subject.branch,
  semester: subject.semester,

  conducted,
  attended,
  percentage,
  status,
};
      })
    );

    res.status(200).json({
      success: true,
      data: summary,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Save Subject Attendance
// =======================================

const saveSubjectAttendance = async (req, res) => {
  try {
    const { student, remarks, attendance } = req.body;

    // Validation
    if (!student || !attendance || attendance.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Incomplete attendance data.",
      });
    }

// Today's date (ignore time)
const today = new Date();

today.setHours(0, 0, 0, 0);

// Check duplicates
for (const item of attendance) {

  const existingAttendance =
    await Attendance.findOne({
      student,
      subject: item.subject,

      date: {
        $gte: today,

        $lt: new Date(
          today.getTime() +
            24 * 60 * 60 * 1000
        ),
      },
    });

  if (existingAttendance) {

    return res.status(400).json({
      success: false,
      message:
        "Attendance already marked for today.",
    });

  }

}

    // Create attendance records
    const attendanceRecords = attendance.map((item) => ({
      student,
      subject: item.subject,
      status: item.status,
      remarks,
      date: new Date(),
    }));

  

    // Save to MongoDB
    const savedAttendance = await Attendance.insertMany(
      attendanceRecords
    );

    res.status(201).json({
      success: true,
      message: "Subject attendance saved successfully.",
      count: savedAttendance.length,
      data: savedAttendance,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get Attendance History By Subject
// =======================================

const getAttendanceHistory = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const attendance = await Attendance.find({
      subject: subjectId,
    })
      .populate("student", "fullName hallTicketNo")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  saveSubjectAttendance,
  getSubjectAttendanceSummary,
  getAttendanceHistory,
};