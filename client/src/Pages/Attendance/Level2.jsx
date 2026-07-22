import { useEffect, useState } from "react";

import SubjectAttendanceTable from "../../components/SubjectAttendanceTable/SubjectAttendanceTable";

import { getSubjectAttendanceSummary } from "../../services/attendanceService";
import Modal from "../../components/Modal/Modal";

import SubjectAttendanceForm from "../../components/Form/SubjectAttendanceForm/SubjectAttendanceForm";
import AttendanceHistory from "../../components/AttendanceHistory/AttendanceHistory";

function Level2() {
  const [subjects, setSubjects] = useState([]);

const [filteredSubjects, setFilteredSubjects] = useState([]);

const [searchTerm, setSearchTerm] = useState("");

const [semesterFilter, setSemesterFilter] =
  useState("All");

const [departmentFilter, setDepartmentFilter] =
  useState("All");

  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

const [historyModal, setHistoryModal] = useState(false);

const [selectedSubjectId, setSelectedSubjectId] =
  useState(null);

  const fetchSubjects = async () => {
    try {
      const response =
  await getSubjectAttendanceSummary();

setSubjects(response.data);
console.log(response.data);

setFilteredSubjects(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);
  console.log("Semester:", semesterFilter);
console.log("Department:", departmentFilter);

  useEffect(() => {
  let data = [...subjects];

  // Search
  if (searchTerm.trim() !== "") {
    data = data.filter(
      (subject) =>
        subject.subjectName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        subject.subjectCode
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }

  // Semester
  if (semesterFilter !== "All") {
    data = data.filter(
      (subject) =>
        subject.semester === semesterFilter
    );
  }

  // Department
  if (departmentFilter !== "All") {
    data = data.filter(
      (subject) =>
        subject.branch === departmentFilter
    );
  }

  setFilteredSubjects(data);
  console.log(data);

}, [
  subjects,
  searchTerm,
  semesterFilter,
  departmentFilter,
]);

const handleViewHistory = (subjectId) => {
  setSelectedSubjectId(subjectId);
  setHistoryModal(true);
};

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading Subject Attendance...
      </div>
    );
  }

const totalConducted = subjects.reduce(
  (sum, subject) => sum + subject.conducted,
  0
);

const totalAttended = subjects.reduce(
  (sum, subject) => sum + subject.attended,
  0
);

const overallPercentage =
  totalConducted === 0
    ? 0
    : ((totalAttended / totalConducted) * 100).toFixed(2);

  return (
    <div className="space-y-8">

      {/* ================= Header ================= */}

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Subject Attendance
          </h1>

          <p className="text-gray-500 mt-1">
            Manage attendance for each subject.
          </p>
        </div>

        <button
  onClick={() => setOpenModal(true)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow"
>
  + Mark Subject Attendance
</button>

<Modal
  isOpen={historyModal}
  title="Attendance History"
  onClose={() => setHistoryModal(false)}
>
  <AttendanceHistory
    subjectId={selectedSubjectId}
  />
</Modal>

      </div>

      {/* ================= Dashboard ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-white rounded-xl shadow border p-5">

          <p className="text-gray-500 text-sm">
            Total Subjects
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {subjects.length}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow border p-5">

          <p className="text-gray-500 text-sm">
            Classes Conducted
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {totalConducted}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow border p-5">

          <p className="text-gray-500 text-sm">
            Classes Attended
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            {totalAttended}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow border p-5">

          <p className="text-gray-500 text-sm">
            Overall Attendance
          </p>

          <h2 className="text-3xl font-bold text-orange-600 mt-2">
            {overallPercentage}%
          </h2>

        </div>

      </div>

      {/* ================= Search & Filters ================= */}

      <div className="bg-white rounded-xl shadow-sm border p-5">

        <div className="flex flex-wrap gap-3">

          <input
  type="text"
  placeholder="Search Subject..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
  className="w-72 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
/>

          <select
  value={semesterFilter}
  onChange={(e) =>
    setSemesterFilter(e.target.value)
  }
  className="border border-gray-300 rounded-xl px-4 py-2"
>
  <option value="All">All Semesters</option>

  <option value="1-1">Semester 1-1</option>
  <option value="1-2">Semester 1-2</option>

  <option value="2-1">Semester 2-1</option>
  <option value="2-2">Semester 2-2</option>

  <option value="3-1">Semester 3-1</option>
  <option value="3-2">Semester 3-2</option>

  <option value="4-1">Semester 4-1</option>
  <option value="4-2">Semester 4-2</option>
</select>

<select
  value={departmentFilter}
  onChange={(e) =>
    setDepartmentFilter(e.target.value)
  }
  className="border border-gray-300 rounded-xl px-4 py-2"
>
  <option value="All">All Departments</option>

  <option value="CSE">CSE</option>
  <option value="CSE-A">CSE-A</option>
  <option value="CSE-B">CSE-B</option>

  <option value="AIML">AIML</option>
  <option value="DS">DS</option>
  <option value="ECE">ECE</option>
  <option value="EEE">EEE</option>
</select>

          <button
  onClick={() => {
    setSearchTerm("");
    setSemesterFilter("All");
    setDepartmentFilter("All");
  }}
  className="border border-gray-300 rounded-xl px-4 py-2 hover:bg-gray-100 transition"
>
  Reset
</button>

        </div>

      </div>

      {/* ================= Subject Attendance Table ================= */}

      <SubjectAttendanceTable
  subjects={filteredSubjects}
  onView={handleViewHistory}
/>
<Modal
  isOpen={openModal}
  title="Mark Subject Attendance"
  onClose={() => setOpenModal(false)}
>
<SubjectAttendanceForm
  onCancel={() => setOpenModal(false)}
  onSuccess={() => {
    setOpenModal(false);
    fetchSubjects();
  }}
/>
</Modal>
    </div>
  );
}

export default Level2;