import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Students from "../pages/Students/Students";
import Subjects from "../pages/Subjects/Subjects";
import Attendance from "../Pages/Attendance/Attendance";
import Level2 from "../pages/Attendance/Level2";
import Level3 from "../Pages/Attendance/Level3";
import Reports from "../pages/Reports/Reports";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/attendance-level2" element={<Level2 />} />
        <Route path="/attendance-level3" element={<Level3 />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;