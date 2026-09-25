import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { getStudents } from "../../services/studentService";
import { getPersonalAttendance } from "../../services/attendanceService";

function Reports() {
const [students, setStudents] = useState([]);
const [selectedStudent, setSelectedStudent] = useState(null);
const [loading, setLoading] = useState(true);

const [attendance, setAttendance] = useState(null);
const [attendanceLoading, setAttendanceLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();

        if (response.success) {
          setStudents(response.data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleStudentChange = async (e) => {
  const studentId = e.target.value;

  const student = students.find(
    (item) => item._id === studentId
  );

  setSelectedStudent(student || null);
  setAttendance(null);

  if (!studentId) {

    return;
  }

  try {
    setAttendanceLoading(true);

    const response = await getPersonalAttendance(studentId);

    if (response.success) {
      setAttendance(response.data);
    }
  } catch (error) {
    console.error("Error fetching attendance:", error);
  } finally {
    setAttendanceLoading(false);
  }
};

const getAttendanceStatus = (percentage) => {
  if (percentage >= 90) {
    return "Excellent";
  } else if (percentage >= 75) {
    return "Good";
  } else if (percentage >= 65) {
    return "Average";
  } else {
    return "Low";
  }
};

  return (
    <MainLayout>
      <div className="p-6">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Attendance Reports
          </h1>

          <p className="text-gray-500 mt-1">
            View complete student attendance reports
          </p>
        </div>

        {/* Student Selection */}
        <div className="bg-white p-5 rounded-lg shadow mb-6">
          <label className="block font-semibold mb-2">
            Select Student
          </label>

          {loading ? (
            <p>Loading students...</p>
          ) : (
            <select
              value={selectedStudent?._id || ""}
              onChange={handleStudentChange}
              className="border rounded-md px-3 py-2 w-full max-w-md"
            >
              <option value="">
                Select a student
              </option>

              {students.map((student) => (
                <option
                  key={student._id}
                  value={student._id}
                >
                  {student.fullName} - {student.hallTicketNo}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Student Profile */}
        {selectedStudent && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">
              Student Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

              <div>
                <p className="text-gray-500 text-sm">
                  Name
                </p>
                <p className="font-semibold">
                  {selectedStudent.fullName}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Hall Ticket
                </p>
                <p className="font-semibold">
                  {selectedStudent.hallTicketNo}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Branch
                </p>
                <p className="font-semibold">
                  {selectedStudent.branch}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Section
                </p>
                <p className="font-semibold">
                  {selectedStudent.section}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Semester
                </p>
                <p className="font-semibold">
                  {selectedStudent.semester}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Academic Year
                </p>
                <p className="font-semibold">
                  {selectedStudent.academicYear}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Email
                </p>
                <p className="font-semibold">
                  {selectedStudent.email}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Status
                </p>
                <p className="font-semibold">
                  {selectedStudent.status}
                </p>
              </div>

            </div>
          </div>
        )}

        {selectedStudent && (
  <div className="bg-white p-6 rounded-lg shadow mb-6">
    <h2 className="text-xl font-bold mb-4">
      Attendance Overview
    </h2>

    {attendanceLoading ? (
      <p>Loading attendance...</p>
    ) : attendance ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="border rounded-lg p-4">
          <p className="text-gray-500 text-sm">
            Overall Attendance
          </p>

          <p className="text-3xl font-bold mt-2">
            {attendance.overallPercentage}%
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-gray-500 text-sm">
            Target Attendance
          </p>

          <p className="text-3xl font-bold mt-2">
            75%
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-gray-500 text-sm">
            Present
          </p>

          <p className="text-3xl font-bold mt-2">
            {attendance.totalPresent}
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-gray-500 text-sm">
            Absent
          </p>

          <p className="text-3xl font-bold mt-2">
            {attendance.totalAbsent}
          </p>
        </div>

      </div>
    ) : null}
  </div>
)}

{selectedStudent && attendance && (
  <div className="bg-white p-6 rounded-lg shadow mb-6">
    <h2 className="text-xl font-bold mb-4">
      Attendance Health
    </h2>

    <div className="flex items-center justify-between border rounded-lg p-5">
      <div>
        <p className="text-gray-500 text-sm">
          Current Attendance
        </p>

        <p className="text-3xl font-bold mt-1">
          {attendance.overallPercentage}%
        </p>
      </div>

      <div className="text-right">
        <p className="text-gray-500 text-sm">
          Attendance Status
        </p>

        <p className="text-xl font-bold mt-1">
          {getAttendanceStatus(
            attendance.overallPercentage
          )}
        </p>
      </div>
    </div>
  </div>
)}


{selectedStudent && attendance && (
  <div className="bg-white p-6 rounded-lg shadow mb-6">

    <div className="mb-5">
      <h2 className="text-xl font-bold">
        Subject-wise Attendance
      </h2>

      <p className="text-gray-500 mt-1">
        Attendance performance for each subject
      </p>
    </div>

    <div className="overflow-x-auto">

      <table className="w-full text-left">

        <thead>
          <tr className="border-b bg-gray-50">

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
              Present
            </th>

            <th className="py-3 px-4">
              Absent
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

          {attendance.subjects.length > 0 ? (

            attendance.subjects.map((subject) => (

              <tr
                key={subject._id}
                className="border-b hover:bg-gray-50"
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

                <td className="py-3 px-4 text-green-600 font-medium">
                  {subject.attended}
                </td>

                <td className="py-3 px-4 text-red-600 font-medium">
                  {subject.conducted - subject.attended}
                </td>

                <td className="py-3 px-4 font-semibold">
                  {subject.percentage}%
                </td>

                <td className="py-3 px-4">
                  {subject.status}
                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td
                colSpan="7"
                className="py-6 text-center text-gray-500"
              >
                No subject attendance records found.
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>

  </div>
)}




      </div>
    </MainLayout>
  );
}

export default Reports;