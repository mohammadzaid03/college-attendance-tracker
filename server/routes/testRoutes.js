const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "College Attendance Tracker API Working!"
  });
});

module.exports = router;