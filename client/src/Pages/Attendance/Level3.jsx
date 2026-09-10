
import { useEffect, useState } from "react";
import { getStudents } from "../../services/studentService";
import { getPersonalAttendance } from "../../services/attendanceService";

// =======================================
// Academic Calendar Helper Functions
// =======================================

const isDefaultWorkingDay = (date) => {
  const day = new Date(date).getDay();

  // Sunday = 0
  // Monday = 1
  // Tuesday = 2
  // Wednesday = 3
  // Thursday = 4
  // Friday = 5
  // Saturday = 6

  return day >= 1 && day <= 4;
};

const generateCalendarDays = (year, month) => {
  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const days = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);

    days.push({
      date,
      day,
      status: isDefaultWorkingDay(date)
        ? "Working"
        : "Holiday",
    });
  }

  return days;
};

// =======================================
// Level 3 Component
// =======================================

function Level3() {
  // =======================================
  // State
  // =======================================

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [targetPercentage, setTargetPercentage] = useState(75);

  // Academic Calendar State
  const [selectedMonth, setSelectedMonth] = useState(8);
  const [selectedYear, setSelectedYear] = useState(2026);

  // =======================================
  // Generate Calendar Data
  // =======================================

  const calendarDays = generateCalendarDays(
    selectedYear,
    selectedMonth
  );

  // =======================================
  // Fetch Students
  // =======================================

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();

      setStudents(response.data);
    } catch (error) {
      console.error(
        "Error fetching students:",
        error
      );
    }
  };

  // =======================================
  // Student Selection
  // =======================================

  const handleStudentChange = async (e) => {
    const studentId = e.target.value;

    const student = students.find(
      (student) => student._id === studentId
    );

    setSelectedStudent(student);

    if (!studentId) {
      setAttendanceData(null);
      return;
    }

    try {
      const response =
        await getPersonalAttendance(studentId);

      setAttendanceData(response.data);
    } catch (error) {
      console.error(
        "Error fetching personal attendance:",
        error
      );

      setAttendanceData(null);
    }
  };

  // =======================================
  // Attendance Planner
  // =======================================

  const calculatePlanner = () => {
    if (!attendanceData) {
      return {
        classesNeeded: 0,
        classesCanMiss: 0,
      };
    }

    const attended = attendanceData.totalPresent;
    const conducted = attendanceData.totalClasses;
    const target = targetPercentage / 100;

    // Classes needed to reach target
    let classesNeeded = 0;

    if (conducted === 0) {
      classesNeeded = 0;
    } else if (attended / conducted < target) {
      classesNeeded = Math.ceil(
        (target * conducted - attended) /
          (1 - target)
      );
    }

    // Classes that can be missed
    let classesCanMiss = 0;

    if (conducted > 0) {
      classesCanMiss = Math.floor(
        attended / target - conducted
      );

      if (classesCanMiss < 0) {
        classesCanMiss = 0;
      }
    }

    return {
      classesNeeded,
      classesCanMiss,
    };
  };

  const planner = calculatePlanner();

  // =======================================
  // Future Attendance Prediction
  // =======================================

  const calculatePrediction = (classes) => {
    if (!attendanceData) {
      return {
        attendPercentage: 0,
        missPercentage: 0,
      };
    }

    const attended = attendanceData.totalPresent;
    const conducted = attendanceData.totalClasses;

    // If student attends next N classes
    const attendPercentage =
      conducted + classes === 0
        ? 0
        : Number(
            (
              ((attended + classes) /
                (conducted + classes)) *
              100
            ).toFixed(2)
          );

    // If student misses next N classes
    const missPercentage =
      conducted + classes === 0
        ? 0
        : Number(
            (
              (attended /
                (conducted + classes)) *
              100
            ).toFixed(2)
          );

    return {
      attendPercentage,
      missPercentage,
    };
  };

  const prediction = calculatePrediction(5);

  // =======================================
  // UI
  // =======================================

  return (
    <div className="p-6">

      {/* ===================================
          Page Title
      =================================== */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Level 3 - Personal Attendance
        </h1>

        <p className="text-gray-500 mt-2">
          View and track individual student
          attendance
        </p>
      </div>

      {/* ===================================
          Student Selection
      =================================== */}

      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Select Student
        </h2>

        <select
          value={selectedStudent?._id || ""}
          onChange={handleStudentChange}
          className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            -- Select a Student --
          </option>

          {students.map((student) => (
            <option
              key={student._id}
              value={student._id}
            >
              {student.fullName} -{" "}
              {student.hallTicketNo}
            </option>
          ))}
        </select>

      </div>

      {/* ===================================
          Student Profile
      =================================== */}

      {selectedStudent && (
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Student Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <div>
              <p className="text-sm text-gray-500">
                Full Name
              </p>

              <p className="font-semibold">
                {selectedStudent.fullName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Hall Ticket No
              </p>

              <p className="font-semibold">
                {selectedStudent.hallTicketNo}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="font-semibold">
                {selectedStudent.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Branch
              </p>

              <p className="font-semibold">
                {selectedStudent.branch}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Section
              </p>

              <p className="font-semibold">
                {selectedStudent.section}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Semester
              </p>

              <p className="font-semibold">
                {selectedStudent.semester}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* ===================================
          Attendance Overview
      =================================== */}

      {attendanceData && (
        <div className="mt-6">

          <h2 className="text-xl font-semibold mb-4">
            Attendance Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Overall Percentage */}
            <div className="bg-white rounded-xl shadow p-6">

              <p className="text-sm text-gray-500">
                Overall Attendance
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {attendanceData.overallPercentage}%
              </p>

            </div>

            {/* Total Classes */}
            <div className="bg-white rounded-xl shadow p-6">

              <p className="text-sm text-gray-500">
                Total Classes
              </p>

              <p className="text-3xl font-bold mt-2">
                {attendanceData.totalClasses}
              </p>

            </div>

            {/* Present */}
            <div className="bg-white rounded-xl shadow p-6">

              <p className="text-sm text-gray-500">
                Present
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {attendanceData.totalPresent}
              </p>

            </div>

            {/* Absent */}
            <div className="bg-white rounded-xl shadow p-6">

              <p className="text-sm text-gray-500">
                Absent
              </p>

              <p className="text-3xl font-bold text-red-600 mt-2">
                {attendanceData.totalAbsent}
              </p>

            </div>

          </div>

        </div>
      )}

      {/* ===================================
          Subject-wise Attendance
      =================================== */}

      {attendanceData && (
        <div className="bg-white rounded-xl shadow p-6 mt-6">

          <h2 className="text-xl font-semibold mb-4">
            Subject-wise Attendance
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b">

                  <th className="py-3 px-4">
                    Subject
                  </th>

                  <th className="py-3 px-4">
                    Code
                  </th>

                  <th className="py-3 px-4">
                    Conducted
                  </th>

                  <th className="py-3 px-4">
                    Attended
                  </th>

                  <th className="py-3 px-4">
                    Percentage
                  </th>

                  <th className="py-3 px-4">
                    Status
                  </th>

                </tr>
              </thead>

              <tbody>

                {attendanceData.subjects.map(
                  (subject) => (
                    <tr
                      key={subject._id}
                      className="border-b"
                    >

                      <td className="py-3 px-4 font-medium">
                        {subject.subjectName}
                      </td>

                      <td className="py-3 px-4 text-gray-500">
                        {subject.subjectCode}
                      </td>

                      <td className="py-3 px-4">
                        {subject.conducted}
                      </td>

                      <td className="py-3 px-4">
                        {subject.attended}
                      </td>

                      <td className="py-3 px-4 font-semibold">
                        {subject.percentage}%
                      </td>

                      <td className="py-3 px-4">
                        {subject.status}
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>
      )}

      {/* ===================================
          Attendance Health
      =================================== */}

      {attendanceData && (
        <div className="bg-white rounded-xl shadow p-6 mt-6">

          <h2 className="text-xl font-semibold mb-4">
            Attendance Health
          </h2>

          <div className="p-5 rounded-lg bg-green-50 border border-green-200">

            <h3 className="text-2xl font-bold text-green-700">

              {attendanceData.overallPercentage >=
              90
                ? "Excellent"
                : attendanceData.overallPercentage >=
                  75
                ? "Safe"
                : attendanceData.overallPercentage >=
                  65
                ? "Warning"
                : "Critical"}

            </h3>

            <p className="text-gray-600 mt-2">

              {attendanceData.overallPercentage >=
              75
                ? "Your attendance is currently above the minimum target."
                : "Your attendance is below the minimum target. You need to improve your attendance."}

            </p>

          </div>

        </div>
      )}

      {/* ===================================
          Attendance Planner
      =================================== */}

      {attendanceData && (
        <div className="bg-white rounded-xl shadow p-6 mt-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <div>

              <h2 className="text-xl font-semibold">
                Attendance Planner
              </h2>

              <p className="text-gray-500 mt-1">
                Plan your attendance based on your
                target.
              </p>

            </div>

            <div className="flex items-center gap-2">

              <label className="text-sm font-medium">
                Target:
              </label>

              <select
                value={targetPercentage}
                onChange={(e) =>
                  setTargetPercentage(
                    Number(e.target.value)
                  )
                }
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value={75}>75%</option>
                <option value={80}>80%</option>
                <option value={85}>85%</option>
                <option value={90}>90%</option>
              </select>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Classes Needed */}
            <div className="border rounded-xl p-5">

              <p className="text-sm text-gray-500">
                Classes Needed to Reach Target
              </p>

              <p className="text-3xl font-bold mt-2">
                {planner.classesNeeded}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                consecutive classes attended
              </p>

            </div>

            {/* Classes Can Miss */}
            <div className="border rounded-xl p-5">

              <p className="text-sm text-gray-500">
                Classes You Can Miss
              </p>

              <p className="text-3xl font-bold mt-2">
                {planner.classesCanMiss}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                while staying at or above target
              </p>

            </div>

          </div>

        </div>
      )}

      {/* ===================================
          Future Attendance Prediction
      =================================== */}

      {attendanceData && (
        <div className="bg-white rounded-xl shadow p-6 mt-6">

          <h2 className="text-xl font-semibold">
            Future Attendance Prediction
          </h2>

          <p className="text-gray-500 mt-1 mb-6">
            See how your attendance may change in
            the next 5 classes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Attend Next 5 */}
            <div className="border rounded-xl p-5">

              <p className="text-sm text-gray-500">
                If You Attend Next 5 Classes
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {prediction.attendPercentage}%
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Expected attendance
              </p>

            </div>

            {/* Miss Next 5 */}
            <div className="border rounded-xl p-5">

              <p className="text-sm text-gray-500">
                If You Miss Next 5 Classes
              </p>

              <p className="text-3xl font-bold text-red-600 mt-2">
                {prediction.missPercentage}%
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Expected attendance
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Academic Calendar */}
<div className="level3-section">
  <h2>📅 Academic Calendar</h2>

  <div className="calendar-controls">
    <select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(Number(e.target.value))}
    >
      {[
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].map((month, index) => (
        <option key={index} value={index}>
          {month}
        </option>
      ))}
    </select>

    <select
      value={selectedYear}
      onChange={(e) => setSelectedYear(Number(e.target.value))}
    >
      <option value={2026}>2026</option>
      <option value={2027}>2027</option>
    </select>
  </div>

  <div className="calendar-grid">
    <div className="calendar-weekday">Mon</div>
<div className="calendar-weekday">Tue</div>
<div className="calendar-weekday">Wed</div>
<div className="calendar-weekday">Thu</div>
<div className="calendar-weekday">Fri</div>
<div className="calendar-weekday">Sat</div>
<div className="calendar-weekday">Sun</div>
    {calendarDays.map((item) => (
      <div
        key={item.day}
        className={`calendar-day ${
          item.status === "Working"
            ? "working-day"
            : "holiday-day"
        }`}
      >
        <strong>{item.day}</strong>

        <span>
          {item.status === "Working"
            ? "Working"
            : "Holiday"}
        </span>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}

export default Level3;

