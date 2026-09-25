import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import { getDashboardData } from "../../services/dashboardService";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboardData();
        setDashboard(response.data);
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboard) {
    return (
      <MainLayout>
        <h2 className="text-2xl font-semibold">
          Loading Dashboard...
        </h2>
      </MainLayout>
    );
  }

  const attendance = dashboard.personalAttendance.percentage;

  const attendanceGood = attendance >= 70;

  const attendanceStatus = attendanceGood
    ? "🟢 Above 70% Target"
    : "🔴 Below 70% Target";

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          {dashboard.semesterProgress.semester} •{" "}
          {dashboard.semesterProgress.academicYear}
        </p>
      </div>


      {/* Semester Progress */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <div className="flex justify-between items-center mb-3">

          <div>
            <h2 className="text-xl font-semibold">
              Semester Progress
            </h2>

            <p className="text-gray-500 text-sm">
              {dashboard.semesterProgress.completedDays} days completed
            </p>
          </div>

          <span className="text-2xl font-bold">
            {dashboard.semesterProgress.percentage}%
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{
              width: `${dashboard.semesterProgress.percentage}%`,
            }}
          />

        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-3">

          <span>
            Completed: {dashboard.semesterProgress.completedDays}
          </span>

          <span>
            Remaining: {dashboard.semesterProgress.remainingDays}
          </span>

        </div>

      </div>


      {/* Attendance */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-xl font-semibold">
              Attendance
            </h2>

            <p className="text-gray-500 mt-1">
              Target: 70%
            </p>
          </div>

          <span className="text-3xl font-bold">
            {attendance}%
          </span>

        </div>

        {/* Attendance Progress */}
        <div className="w-full bg-gray-200 rounded-full h-3 mt-5">

          <div
            className={`h-3 rounded-full transition-all ${
              attendanceGood
                ? "bg-green-500"
                : "bg-red-500"
            }`}
            style={{
              width: `${attendance}%`,
            }}
          />

        </div>

        <p className="mt-4 font-medium">
          {attendanceStatus}
        </p>

        {/* Warning */}
        {!attendanceGood && (
          <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-lg">
            ⚠️ Your attendance is below the 70% target.
          </div>
        )}

      </div>


      {/* Today's Attendance + Upcoming */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* Today */}
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            📅 Today's Attendance
          </h2>

          <p className="text-2xl font-bold">
            {dashboard.todayStatus.status === "Present"
              ? "🟢 Present"
              : dashboard.todayStatus.status === "Absent"
              ? "🔴 Absent"
              : "⚪ Not Marked"}
          </p>

        </div>


        {/* Upcoming */}
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            📆 Upcoming
          </h2>

          <p className="text-lg font-medium">
            {dashboard.nextEvent.name}
          </p>

          {dashboard.nextEvent.daysLeft > 0 && (
            <p className="text-gray-500 mt-1">
              {dashboard.nextEvent.daysLeft} days left
            </p>
          )}

        </div>

      </div>


      {/* Attendance Summary */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-5">
          Attendance Summary
        </h2>

        <div className="grid grid-cols-3 gap-4 text-center">

          <div>
            <p className="text-gray-500 text-sm">
              Total
            </p>

            <p className="text-2xl font-bold">
              {dashboard.presentAbsentDays.totalDays}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Present
            </p>

            <p className="text-2xl font-bold text-green-600">
              {dashboard.presentAbsentDays.presentDays}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Absent
            </p>

            <p className="text-2xl font-bold text-red-600">
              {dashboard.presentAbsentDays.absentDays}
            </p>
          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;