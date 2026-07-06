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
        console.error(error);
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

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card
          title="Official Attendance"
          value={`${dashboard.officialAttendance.percentage}%`}
        />

        <Card
          title="Personal Attendance"
          value={`${dashboard.personalAttendance.percentage}%`}
        />

        <Card
          title="Semester Progress"
          value={`${dashboard.semesterProgress.percentage}%`}
        />

        <Card
          title="Current Phase"
          value={dashboard.currentPhase.name}
        />

        <Card
          title="Next Event"
          value={dashboard.nextEvent.name}
        />

        <Card
          title="Days Left"
          value={dashboard.nextEvent.daysLeft}
        />

        <Card
          title="Present Days"
          value={dashboard.presentAbsentDays.presentDays}
        />

        <Card
          title="Today's Status"
          value={dashboard.todayStatus.status}
        />

      </div>
    </MainLayout>
  );
}

export default Dashboard;