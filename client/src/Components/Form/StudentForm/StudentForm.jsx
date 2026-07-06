import { useEffect, useState } from "react";

import {
  createStudent,
  updateStudent,
} from "../../../services/studentService";

function StudentForm({ student, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    fullName: "",
    hallTicketNo: "",
    email: "",
    branch: "",
    section: "",
    semester: "",
    academicYear: "",
    status: "Active",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        fullName: student.fullName || "",
        hallTicketNo: student.hallTicketNo || "",
        email: student.email || "",
        branch: student.branch || "",
        section: student.section || "",
        semester: student.semester || "",
        academicYear: student.academicYear || "",
        status: student.status || "Active",
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (student) {
        await updateStudent(student._id, formData);
        alert("Student Updated Successfully!");
      } else {
        await createStudent(formData);
        alert("Student Added Successfully!");
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Operation Failed!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4"
    >
      <input
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        name="hallTicketNo"
        placeholder="Hall Ticket No"
        value={formData.hallTicketNo}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        name="branch"
        placeholder="Branch"
        value={formData.branch}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        name="section"
        placeholder="Section"
        value={formData.section}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        name="semester"
        placeholder="Semester"
        value={formData.semester}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        name="academicYear"
        placeholder="Academic Year"
        value={formData.academicYear}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <div className="col-span-2 flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="border px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          {student ? "Update Student" : "Save Student"}
        </button>
      </div>
    </form>
  );
}

export default StudentForm;