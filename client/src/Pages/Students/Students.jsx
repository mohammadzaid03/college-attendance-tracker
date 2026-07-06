import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";
import StudentForm from "../../components/Form/StudentForm/StudentForm";

import {
  getStudents,
  deleteStudent,
} from "../../services/studentService";

function Students() {
  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Search Filter
  const filteredStudents = students.filter((student) => {
    return (
      student.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.hallTicketNo
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-red-600 text-lg font-semibold">
            {error}
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
  <MainLayout>
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Students Management
        </h1>

        <p className="text-gray-500 mt-1">
          Manage all students in your college.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">

        <input
          type="text"
          placeholder="🔍 Search by name or hall ticket..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-80 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => {
            setSelectedStudent(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-xl shadow"
        >
          + Add Student
        </button>

      </div>

    </div>

    <Table
      students={filteredStudents}
      onEdit={(student) => {
        setSelectedStudent(student);
        setOpenModal(true);
      }}
      onDelete={async (student) => {
        const confirmDelete = window.confirm(
          `Delete ${student.fullName}?`
        );

        if (!confirmDelete) return;

        try {
          await deleteStudent(student._id);
          alert("Student Deleted Successfully!");
          fetchStudents();
        } catch (error) {
          console.error(error);
          alert("Delete Failed!");
        }
      }}
    />

    <Modal
      isOpen={openModal}
      title={selectedStudent ? "Edit Student" : "Add Student"}
      onClose={() => setOpenModal(false)}
    >
      <StudentForm
        student={selectedStudent}
        onSuccess={() => {
          setOpenModal(false);
          fetchStudents();
        }}
        onCancel={() => setOpenModal(false)}
      />
    </Modal>

  </MainLayout>
);
}

export default Students;