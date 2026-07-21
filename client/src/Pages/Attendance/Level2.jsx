import { useEffect, useState } from "react";

import SubjectAttendanceTable from "../../components/SubjectAttendanceTable/SubjectAttendanceTable";

import { getSubjects } from "../../services/subjectService";

function Level2() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading Subject Attendance...
      </div>
    );
  }

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
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow"
        >
          + Mark Subject Attendance
        </button>

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
            0
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow border p-5">

          <p className="text-gray-500 text-sm">
            Classes Attended
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            0
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow border p-5">

          <p className="text-gray-500 text-sm">
            Overall Attendance
          </p>

          <h2 className="text-3xl font-bold text-orange-600 mt-2">
            0%
          </h2>

        </div>

      </div>

      {/* ================= Search & Filters ================= */}

      <div className="bg-white rounded-xl shadow-sm border p-5">

        <div className="flex flex-wrap gap-3">

          <input
            type="text"
            placeholder="Search Subject..."
            className="w-72 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select className="border border-gray-300 rounded-xl px-4 py-2">

            <option>All Semesters</option>
            <option>Semester 1</option>
            <option>Semester 2</option>
            <option>Semester 3</option>
            <option>Semester 4</option>

          </select>

          <select className="border border-gray-300 rounded-xl px-4 py-2">

            <option>All Departments</option>
            <option>CSE</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>MBA</option>

          </select>

          <button
            className="border border-gray-300 rounded-xl px-4 py-2 hover:bg-gray-100 transition"
          >
            Reset
          </button>

        </div>

      </div>

      {/* ================= Subject Attendance Table ================= */}

      <SubjectAttendanceTable
        subjects={subjects}
      />

    </div>
  );
}

export default Level2;