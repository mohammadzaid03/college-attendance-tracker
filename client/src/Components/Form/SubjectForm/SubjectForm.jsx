import { useEffect, useState } from "react";

import {
  createSubject,
  updateSubject,
} from "../../../services/subjectService";

function SubjectForm({
  subject,
  onSuccess,
  onCancel,
}) {
  const [formData, setFormData] = useState({
  subjectName: "",
  subjectCode: "",
  branch: "",
  semester: "",
  credits: "",
  facultyName: "",
  subjectType: "Theory",
  status: "Active",
});

useEffect(() => {
  if (subject) {
    setFormData({
      subjectName: subject.subjectName || "",
      subjectCode: subject.subjectCode || "",
      branch: subject.branch || "",
      semester: subject.semester || "",
      credits: subject.credits || "",
      facultyName: subject.facultyName || "",
      subjectType: subject.subjectType || "Theory",
      status: subject.status || "Active",
    });
  }
}, [subject]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (subject) {
  await updateSubject(subject._id, formData);
  alert("Subject Updated Successfully!");
} else {
  await createSubject(formData);
  alert("Subject Added Successfully!");
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
      className="grid grid-cols-2 gap-4"
    >
      <input
        name="subjectName"
        placeholder="Subject Name"
        value={formData.subjectName}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        name="subjectCode"
        placeholder="Subject Code"
        value={formData.subjectCode}
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
        name="semester"
        placeholder="Semester"
        value={formData.semester}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        type="number"
        name="credits"
        placeholder="Credits"
        value={formData.credits}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        name="facultyName"
        placeholder="Faculty Name"
        value={formData.facultyName}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <select
        name="subjectType"
        value={formData.subjectType}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      >
        <option>Theory</option>
        <option>Lab</option>
      </select>

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
{subject ? "Update Subject" : "Save Subject"}        
</button>
      </div>
    </form>
  );
}

export default SubjectForm;