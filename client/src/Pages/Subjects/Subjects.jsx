import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/Modal/Modal";
import SubjectTable from "../../components/SubjectTable/SubjectTable";
import SubjectForm from "../../components/Form/SubjectForm/SubjectForm";

import {
  getSubjects,
  deleteSubject,
} from "../../services/subjectService";

function Subjects() {
  const [subjects, setSubjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Search State
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getSubjects();
      setSubjects(response.data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load subjects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Search Filter
  const filteredSubjects = subjects.filter((subject) => {
    return (
      subject.subjectName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      subject.subjectCode
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
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Subject Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all subjects in your college.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          <input
            type="text"
            placeholder="Search by Subject Name or Code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-96 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => {
              setSelectedSubject(null);
              setOpenModal(true);
            }}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-5 py-2 rounded-xl shadow hover:shadow-lg"
          >
            + Add Subject
          </button>

        </div>

      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-5 mb-6">

        <h3 className="text-sm font-medium text-gray-500">
          Total Subjects
        </h3>

        <p className="text-3xl font-bold text-blue-600 mt-1">
          {filteredSubjects.length}
        </p>

      </div>

      {/* Subject Table */}
      <SubjectTable
        subjects={filteredSubjects}
        onEdit={(subject) => {
          setSelectedSubject(subject);
          setOpenModal(true);
        }}
        onDelete={async (subject) => {
          const confirmDelete = window.confirm(
            `Delete ${subject.subjectName}?`
          );

          if (!confirmDelete) return;

          try {
            await deleteSubject(subject._id);
            alert("Subject Deleted Successfully!");
            fetchSubjects();
          } catch (error) {
            console.error(error);

            alert(
              error.response?.data?.message ||
                "Failed to delete subject."
            );
          }
        }}
      />

      {/* Modal */}
      <Modal
        isOpen={openModal}
        title={selectedSubject ? "Edit Subject" : "Add Subject"}
        onClose={() => setOpenModal(false)}
      >
        <SubjectForm
          subject={selectedSubject}
          onSuccess={() => {
            setOpenModal(false);
            fetchSubjects();
          }}
          onCancel={() => setOpenModal(false)}
        />
      </Modal>
    </MainLayout>
  );
}

export default Subjects;