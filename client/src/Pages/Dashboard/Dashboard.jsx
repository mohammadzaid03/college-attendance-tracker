import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import Card from "../../components/Card/Card";

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

  const {
    semesterProgress,
    currentPhase,
    nextEvent,
    officialAttendance,
    presentAbsentDays,
    todayStatus,
    personalAttendance,
  } = dashboard;

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          {semesterProgress.semester} •{" "}
          {semesterProgress.academicYear}
        </p>
      </div>


      {/* Semester Progress */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <div className="flex justify-between items-center mb-4">

          <div>
            <h2 className="text-xl font-semibold">
              Semester Progress
            </h2>

            <p className="text-gray-500">
              {semesterProgress.completedDays} days completed
            </p>
          </div>

          <div className="text-2xl font-bold">
            {semesterProgress.percentage}%
          </div>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-blue-600 h-3 rounded-full"
            style={{
              width: `${semesterProgress.percentage}%`,
            }}
          />

        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-3">

          <span>
            Completed: {semesterProgress.completedDays}
          </span>

          <span>
            Remaining: {semesterProgress.remainingDays}
          </span>

        </div>

      </div>


      {/* Attendance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card
          title="Official Attendance"
          value={`${officialAttendance.percentage}%`}
        />

        <Card
          title="Personal Attendance"
          value={`${personalAttendance.percentage}%`}
        />

        <Card
          title="Present Days"
          value={presentAbsentDays.presentDays}
        />

        <Card
          title="Today's Status"
          value={todayStatus.status}
        />

      </div>


      {/* Academic Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

        <Card
          title="Current Phase"
          value={currentPhase.name}
        />

        <Card
          title="Next Event"
          value={nextEvent.name}
        />

        <Card
          title="Days Left"
          value={nextEvent.daysLeft}
        />

      </div>


      {/* Attendance Details */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">

        <h2 className="text-xl font-semibold mb-4">
          Attendance Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div>
            <p className="text-gray-500">
              Total Days
            </p>

            <p className="text-2xl font-bold">
              {presentAbsentDays.totalDays}
            </p>
          </div>


          <div>
            <p className="text-gray-500">
              Present
            </p>

            <p className="text-2xl font-bold">
              {presentAbsentDays.presentDays}
            </p>
          </div>


          <div>
            <p className="text-gray-500">
              Absent
            </p>

            <p className="text-2xl font-bold">
              {presentAbsentDays.absentDays}
            </p>
          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;