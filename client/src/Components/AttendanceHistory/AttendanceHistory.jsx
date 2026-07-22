import { useEffect, useState } from "react";

import {
  getAttendanceHistory,
  updateAttendance,
  deleteAttendance,
} from "../../services/attendanceService";

function AttendanceHistory({ subjectId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (subjectId) {
      fetchHistory();
    }
  }, [subjectId]);



  const fetchHistory = async () => {
    try {
      const response = await getAttendanceHistory(subjectId);
      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = (id, value) => {
  setHistory((prev) =>
    prev.map((item) =>
      item._id === id
        ? { ...item, status: value }
        : item
    )
  );
};

const handleSave = async (item) => {
  try {
    const response = await updateAttendance(
      item._id,
      {
        status: item.status,
      }
    );

    alert(response.message);

    fetchHistory();

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Update failed."
    );
  }
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this attendance?"
  );

  if (!confirmDelete) return;

  try {
    const response = await deleteAttendance(id);

    alert(response.message);

    fetchHistory();

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Delete failed."
    );
  }
};

  return (
    <div className="max-h-[500px] overflow-y-auto">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-3 text-left">Student</th>
            <th className="p-3 text-left">Hall Ticket</th>
            <th className="p-3 text-center">Status</th>
<th className="p-3 text-center">Date</th>

<th className="p-3 text-center">
  Action
</th>            
          </tr>

        </thead>

        <tbody>

          {history.map((item) => (

            <tr
              key={item._id}
              className="border-b"
            >

              <td className="p-3">
                {item.student.fullName}
              </td>

              <td className="p-3">
                {item.student.hallTicketNo}
              </td>

              <td className="p-3 text-center">

  <select
    value={item.status}
    onChange={(e) =>
      handleStatusChange(
        item._id,
        e.target.value
      )
    }
    className="border rounded-lg px-2 py-1"
  >
    <option value="Present">
      Present
    </option>

    <option value="Absent">
      Absent
    </option>

  </select>

</td>

              <td className="p-3 text-center">
                {new Date(item.date).toLocaleDateString()}
              </td>

  <td className="p-3 text-center">

  <div className="flex justify-center gap-2">

    <button
      onClick={() => handleSave(item)}
      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
    >
      Save
    </button>

    <button
      onClick={() => handleDelete(item._id)}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
    >
      Delete
    </button>

  </div>

</td>

            </tr>

            

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AttendanceHistory;