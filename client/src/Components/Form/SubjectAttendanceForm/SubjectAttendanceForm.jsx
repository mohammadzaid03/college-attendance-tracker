import { saveSubjectAttendance } from "../../../services/attendanceService";
import { useState, useEffect } from "react";

import { getSubjects } from "../../../services/subjectService";
import { getStudents } from "../../../services/studentService";

function SubjectAttendanceForm({ onCancel, onSuccess }) {
const [subjects, setSubjects] = useState([]);
const [filteredSubjects, setFilteredSubjects] = useState([]);
const [students, setStudents] = useState([]);
const [selectedStudent, setSelectedStudent] = useState("");
const [studentInfo, setStudentInfo] = useState(null);
const [attendanceStatus, setAttendanceStatus] = useState({});

const [remarks, setRemarks] = useState("");

  useEffect(() => {
    fetchSubjects();
    fetchStudents();

    
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

const handleSubmit = async () => {
  try {
    if (!selectedStudent) {
      alert("Please select a student.");
      return;
    }

    if (filteredSubjects.length === 0) {
      alert("No subjects available.");
      return;
    }

    const attendanceData = {
      student: selectedStudent,
      remarks,

      attendance: filteredSubjects.map((subject) => ({
        subject: subject._id,
        status: attendanceStatus[subject._id] || "Present",
      })),
    };

    console.log(attendanceData);

    const response = await saveSubjectAttendance(attendanceData);

    alert(response.message);

    // Reset Form
    setSelectedStudent("");
    setStudentInfo(null);
    setFilteredSubjects([]);
    setAttendanceStatus({});
    setRemarks("");

    // Close modal (if parent passed onSuccess)
    if (onSuccess) {
      onSuccess();
    }

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to save attendance."
    );
  }
};


  return (
    <div className="space-y-6">

      {/* Subject */}

      


{/* Student */}

<div>
  <label className="block text-sm font-medium mb-2">
    Student
  </label>

  <select
    value={selectedStudent}
    
onChange={(e) => {
  const studentId = e.target.value;

  setSelectedStudent(studentId);

  const student = students.find(
    (s) => s._id === studentId
  );

  setStudentInfo(student || null);

  if (student) {
    const matchedSubjects = subjects.filter(
      (subject) =>
        subject.branch === student.branch &&
        subject.semester === student.semester
    );

    setFilteredSubjects(matchedSubjects);
  } else {
    setFilteredSubjects([]);
  }
}}

    className="w-full border rounded-lg px-3 py-2"
  >
    <option value="">
      Select Student
    </option>

    {students.map((student) => (
      <option
        key={student._id}
        value={student._id}
      >
        {student.fullName} ({student.hallTicketNo})
      </option>
    ))}
  </select>
</div>


{studentInfo && (

  <div className="grid grid-cols-3 gap-4 mt-6">

    <div className="bg-gray-50 border rounded-xl p-4">
      <p className="text-sm text-gray-500">
        Branch
      </p>

      <h3 className="font-semibold text-lg">
        {studentInfo.branch}
      </h3>
    </div>

    <div className="bg-gray-50 border rounded-xl p-4">
      <p className="text-sm text-gray-500">
        Semester
      </p>

      <h3 className="font-semibold text-lg">
        {studentInfo.semester}
      </h3>
    </div>

    <div className="bg-gray-50 border rounded-xl p-4">
      <p className="text-sm text-gray-500">
        Section
      </p>

      <h3 className="font-semibold text-lg">
        {studentInfo.section}
      </h3>
    </div>

  </div>

)}

{filteredSubjects.length > 0 && (

  <div className="bg-white border rounded-xl p-5 mt-6">

    <h3 className="text-lg font-semibold mb-4">
      Subjects
    </h3>

    <div className="space-y-4">

      {filteredSubjects.map((subject) => (

        <div
          key={subject._id}
          className="flex justify-between items-center border-b pb-3"
        >

          <div>

            <p className="font-semibold">
              {subject.subjectName}
            </p>

            <p className="text-sm text-gray-500">
              {subject.subjectCode}
            </p>

          </div>

<select
  value={attendanceStatus[subject._id] || "Present"}
  onChange={(e) =>
    setAttendanceStatus({
      ...attendanceStatus,
      [subject._id]: e.target.value,
    })
  }
  className="border rounded-lg px-3 py-2"
>
  <option value="Present">
    Present
  </option>

  <option value="Absent">
    Absent
  </option>
</select>
        </div>

      ))}

    </div>

  </div>

)}
      
      {/* Remarks */}

      <div>

        <label className="block mb-2 font-semibold">
          Remarks
        </label>

        <select
  value={remarks}
  onChange={(e) => setRemarks(e.target.value)}
  className="w-full border rounded-xl px-4 py-2"
>
  <option value="">Select Remark</option>

  <option value="Regular Class">
    Regular Class
  </option>

  <option value="Lab Session">
    Lab Session
  </option>

  <option value="Seminar">
    Seminar
  </option>

  <option value="Internal Exam">
    Internal Exam
  </option>

  <option value="Medical Leave">
    Medical Leave
  </option>

  <option value="Holiday">
    Holiday
  </option>

  <option value="Other">
    Other
  </option>
</select>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-3">

        <button
  type="button"
  onClick={onCancel}
  className="border px-5 py-2 rounded-xl"
>
  Cancel
</button>

        <button
  type="button"
  onClick={handleSubmit}
  className="bg-blue-600 text-white px-5 py-2 rounded-xl"
>
  Save Attendance
</button>

      </div>

    </div>
  );
}

export default SubjectAttendanceForm;
