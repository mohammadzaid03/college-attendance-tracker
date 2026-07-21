import { useEffect, useState } from "react";

import {
  createAttendance,
  updateAttendance,
} from "../../../services/attendanceService";

import { getStudents } from "../../../services/studentService";
import { getSubjects } from "../../../services/subjectService";

function AttendanceForm({
  attendance,
  onSuccess,
  onCancel,
}) {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    student: "",
    subject: "",
    date: "",
    status: "Present",
    remarks: "",
  });

  const [remarkType, setRemarkType] = useState("None");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
  if (attendance) {
    const predefinedRemarks = [
      "Health Issue",
      "Personal Work",
      "Project Work",
      "Family Emergency",
      "Weather",
    ];

    const remark = attendance.remarks || "";

    setFormData({
      student: attendance.student?._id || "",
      subject: attendance.subject?._id || "",
      date: attendance.date
        ? attendance.date.split("T")[0]
        : "",
      status: attendance.status,
      remarks: remark,
    });

    if (!remark) {
      setRemarkType("None");
    } else if (predefinedRemarks.includes(remark)) {
      setRemarkType(remark);
    } else {
      setRemarkType("Other");
    }
  }
}, [attendance]);

  const loadData = async () => {
    try {
      const studentsRes = await getStudents();
      const subjectsRes = await getSubjects();

      setStudents(studentsRes.data);
      setSubjects(subjectsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (attendance) {
        await updateAttendance(
          attendance._id,
          formData
        );

        alert("Attendance Updated Successfully!");
      } else {
        await createAttendance(formData);

        alert("Attendance Added Successfully!");
      }

      onSuccess();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Operation Failed!"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Header */}

      <div>
        <h2 className="text-xl font-bold text-gray-800">
          {attendance
            ? "Edit Attendance"
            : "Mark Attendance"}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Fill in the attendance details below.
        </p>
      </div>

      {/* Form Fields */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Student */}

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Student <span className="text-red-500">*</span>
          </label>

          <select
            name="student"
            value={formData.student}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">
              Select Student
            </option>

            {students.map((student) => (
              <option
                key={student._id}
                value={student._id}
              >
                {student.fullName}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Subject <span className="text-red-500">*</span>
          </label>

          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">
              Select Subject
            </option>

            {subjects.map((subject) => (
              <option
                key={subject._id}
                value={subject._id}
              >
                {subject.subjectName}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Date <span className="text-red-500">*</span>
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status */}
            <div>
  <label className="block mb-3 text-sm font-semibold text-gray-700">
    Attendance Status <span className="text-red-500">*</span>
  </label>

  <div className="grid grid-cols-2 gap-4">

    {/* Present */}

    <label
      className={`cursor-pointer rounded-xl border-2 p-4 text-center transition ${
        formData.status === "Present"
          ? "border-blue-600 bg-blue-50"
          : "border-gray-300 hover:border-blue-300"
      }`}
    >
      <input
        type="radio"
        name="status"
        value="Present"
        checked={formData.status === "Present"}
        onChange={handleChange}
        className="hidden"
      />

      <div className="text-3xl mb-2">
        ✅
      </div>

      <p className="font-semibold text-gray-800">
        Present
      </p>
    </label>

    {/* Absent */}

    <label
      className={`cursor-pointer rounded-xl border-2 p-4 text-center transition ${
        formData.status === "Absent"
          ? "border-red-600 bg-red-50"
          : "border-gray-300 hover:border-red-300"
      }`}
    >
      <input
        type="radio"
        name="status"
        value="Absent"
        checked={formData.status === "Absent"}
        onChange={handleChange}
        className="hidden"
      />

      <div className="text-3xl mb-2">
        ❌
      </div>

      <p className="font-semibold text-gray-800">
        Absent
      </p>
    </label>

  </div>
</div>

        {/* Remarks */}

{formData.status === "Absent" && (
  <div className="md:col-span-2">

    <label className="block mb-2 text-sm font-semibold text-gray-700">
      Reason (Optional)
    </label>

    <select
      value={remarkType}
      onChange={(e) => {
        const value = e.target.value;

        setRemarkType(value);

        if (value === "None") {
          setFormData({
            ...formData,
            remarks: "",
          });
        } else if (value !== "Other") {
          setFormData({
            ...formData,
            remarks: value,
          });
        } else {
          setFormData({
            ...formData,
            remarks: "",
          });
        }
      }}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="None">None</option>
      <option value="Health Issue">Health Issue</option>
      <option value="Personal Work">Personal Work</option>
      <option value="Project Work">Project Work</option>
      <option value="Family Emergency">Family Emergency</option>
      <option value="Weather">Weather</option>
      <option value="Other">Other</option>
    </select>

    {remarkType === "Other" && (
      <input
        type="text"
        placeholder="Enter reason (max 3-4 words)"
        maxLength={30}
        value={formData.remarks}
        onChange={(e) =>
          setFormData({
            ...formData,
            remarks: e.target.value,
          })
        }
        className="mt-3 w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}

  </div>
)}

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-3 pt-2">

        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-blue-600 text-white shadow hover:bg-blue-700 transition"
        >
          {attendance
            ? "Update Attendance"
            : "Save Attendance"}
        </button>

      </div>

    </form>
  );
}

export default AttendanceForm;