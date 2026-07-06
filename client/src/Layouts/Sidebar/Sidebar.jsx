import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-5">
      <ul className="space-y-4">

        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/students">Students</Link>
        </li>

        <li>
          <Link to="/subjects">Subjects</Link>
        </li>

        <li>
          <Link to="/attendance">Attendance</Link>
        </li>

        <li>
          <Link to="/reports">Reports</Link>
        </li>

      </ul>
    </aside>
  );
}

export default Sidebar;