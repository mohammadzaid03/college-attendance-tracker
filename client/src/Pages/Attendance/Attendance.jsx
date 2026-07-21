import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/Modal/Modal";

import AttendanceTable from "../../components/AttendanceTable/AttendanceTable";
import AttendanceForm from "../../components/Form/AttendanceForm/AttendanceForm";

import {
  getAttendance,
  deleteAttendance,
} from "../../services/attendanceService";


function Attendance() {
  const [attendance, setAttendance] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Status Filter
  const [statusFilter, setStatusFilter] = useState("All");

  //datefilter
  const [dateFilter, setDateFilter] = useState("");

  const resetFilters = () => {
  setSearchTerm("");
  setStatusFilter("All");
  setDateFilter("");
};
// Today's Date
const today = new Date().toISOString().split("T")[0];

  // Fetch Attendance
  const fetchAttendance = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAttendance();
      setAttendance(response.data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load attendance."
      );
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Search + Status + Date Filter
const filteredAttendance = attendance.filter((record) => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    record.student?.fullName
      ?.toLowerCase()
      .includes(search) ||
    record.student?.hallTicketNo
      ?.toLowerCase()
      .includes(search) ||
    record.subject?.subjectName
      ?.toLowerCase()
      .includes(search) ||
    record.subject?.subjectCode
      ?.toLowerCase()
      .includes(search);

  const matchesStatus =
    statusFilter === "All" ||
    record.status === statusFilter;

  const matchesDate =
    !dateFilter ||
    new Date(record.date).toISOString().split("T")[0] === dateFilter;

  return (
    matchesSearch &&
    matchesStatus &&
    matchesDate
  );
});

// Today's Attendance Records
const todayAttendance = attendance.filter(
  (record) =>
    new Date(record.date).toISOString().split("T")[0] === today
);

// Daily Statistics
const presentToday = todayAttendance.filter(
  (record) => record.status === "Present"
).length;

const absentToday = todayAttendance.filter(
  (record) => record.status === "Absent"
).length;

const todayTotal = todayAttendance.length;

const attendanceRate =
  todayTotal > 0
    ? Math.round((presentToday / todayTotal) * 100)
    : 0;



const activeFilters =
  (searchTerm ? 1 : 0) +
  (statusFilter !== "All" ? 1 : 0) +
  (dateFilter ? 1 : 0);



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



{/* =========================
    Header
========================= */}

<div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8">

  {/* Left */}

  <div>

    <h1 className="text-3xl font-bold text-gray-800">
      Attendance Management
    </h1>

    <p className="text-gray-500 mt-1">
      Manage and monitor daily attendance records.
    </p>

  </div>

  {/* Right */}

  <div className="flex flex-col gap-4 w-full lg:w-auto">


   

    {/* Search & Filters */}

    <div className="flex flex-wrap gap-3">

      {/* Search */}

      <input
        type="text"
        placeholder="Search Student or Hall Ticket..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-72 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {/* Status */}

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border border-gray-300 rounded-xl px-4 py-2"
      >
        <option value="All">All Status</option>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      {/* Date */}

      <input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="border border-gray-300 rounded-xl px-4 py-2"
      />

      {/* Reset */}

      <button
        onClick={resetFilters}
        className="border border-gray-300 rounded-xl px-4 py-2 hover:bg-gray-100 transition"
      >
        Reset
      </button>

      {/* Mark Attendance */}

      <button
        onClick={() => {
          setSelectedAttendance(null);
          setOpenModal(true);
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2 shadow"
      >
        + Mark Attendance
      </button>

    </div>

  </div>

</div>
      {/* Summary Card */}
          {/* Daily Attendance Dashboard */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
  <div>
    <h2 className="text-2xl font-bold text-gray-800">
      Daily Attendance Overview
    </h2>

    <p className="text-gray-500 mt-1">
      Attendance summary for today.
    </p>
  </div>

  <div className="text-sm text-gray-500 mt-3 md:mt-0">
    {new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
  </div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

  {/* Present */}

  <div className="bg-white rounded-xl border border-green-200 shadow-sm p-5 hover:shadow-md transition">
    <div className="flex justify-between items-center">

      <div>
        <p className="text-sm text-gray-500">
          Present Today
        </p>

        <h2 className="text-3xl font-bold text-green-600 mt-2">
          {presentToday}
        </h2>
      </div>

      <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-3xl">
        ✅
      </div>

    </div>
  </div>

  {/* Absent */}

  <div className="bg-white rounded-xl border border-red-200 shadow-sm p-5 hover:shadow-md transition">
    <div className="flex justify-between items-center">

      <div>
        <p className="text-sm text-gray-500">
          Absent Today
        </p>

        <h2 className="text-3xl font-bold text-red-600 mt-2">
          {absentToday}
        </h2>
      </div>

      <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center text-3xl">
        ❌
      </div>

    </div>
  </div>

  {/* Today's Records */}

  <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-5 hover:shadow-md transition">
    <div className="flex justify-between items-center">

      <div>
        <p className="text-sm text-gray-500">
          Today's Records
        </p>

        <h2 className="text-3xl font-bold text-blue-600 mt-2">
          {todayTotal}
        </h2>
      </div>

      <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-3xl">
        📅
      </div>

    </div>
  </div>

  {/* Attendance Rate */}

  <div className="bg-white rounded-xl border border-purple-200 shadow-sm p-5 hover:shadow-md transition">
    <div className="flex justify-between items-center">

      <div>
        <p className="text-sm text-gray-500">
          Attendance Rate
        </p>

        <h2 className="text-3xl font-bold text-purple-600 mt-2">
          {attendanceRate}%
        </h2>
      </div>

      <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-3xl">
        📊
      </div>

    </div>
  </div>
  

</div>

      {/* Table */}

      <AttendanceTable
        attendance={filteredAttendance}
        hasFilters={activeFilters > 0}
        onEdit={(record) => {
          setSelectedAttendance(record);
          setOpenModal(true);
        }}
        onDelete={async (record) => {
          const confirmDelete = window.confirm(
            "Delete this attendance record?"
          );

          if (!confirmDelete) return;

          try {
            await deleteAttendance(record._id);

            alert(
              "Attendance Deleted Successfully!"
            );

            fetchAttendance();
          } catch (error) {
            console.error(error);

            alert(
              error.response?.data?.message ||
                "Failed to delete attendance."
            );
          }
        }}
      />

      {/* Modal */}

      <Modal
        isOpen={openModal}
        title={
          selectedAttendance
            ? "Edit Attendance"
            : "Mark Attendance"
        }
        onClose={() => setOpenModal(false)}
      >
        <AttendanceForm
          attendance={selectedAttendance}
          onSuccess={() => {
            setOpenModal(false);
            fetchAttendance();
          }}
          onCancel={() => setOpenModal(false)}
        />
      </Modal>

    </MainLayout>
  );
}

export default Attendance;