function Table({ students, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
      <table className="min-w-full">
        <thead className="bg-blue-600 text-white uppercase text-sm tracking-wide">
          <tr>
            <th className="px-5 py-4 text-left">Full Name</th>
            <th className="px-5 py-4 text-left">Hall Ticket</th>
            <th className="px-5 py-4 text-left">Branch</th>
            <th className="px-5 py-4 text-left">Section</th>
            <th className="px-5 py-4 text-left">Semester</th>
            <th className="px-5 py-4 text-center">Status</th>
            <th className="w-56 px-5 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr
                key={student._id}
                className="border-b hover:bg-blue-50 transition duration-200"
              >
                <td className="px-5 py-4 font-medium">
                  {student.fullName}
                </td>

                <td className="px-5 py-4">
                  {student.hallTicketNo}
                </td>

                <td className="px-5 py-4">
                  {student.branch}
                </td>

                <td className="px-5 py-4">
                  {student.section}
                </td>

                <td className="px-5 py-4">
                  {student.semester}
                </td>

                <td className="px-5 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      student.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-center items-center gap-3">
                    <button
                      onClick={() => onEdit(student)}
                      className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-4 py-2 rounded-lg shadow"
                    >
                      ✏ Edit
                    </button>

                    <button
                      onClick={() => onDelete(student)}
                      className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-lg shadow"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center py-12"
              >
                <div className="text-5xl mb-3">
                  📚
                </div>

                <h2 className="text-xl font-semibold text-gray-700">
                  No Students Found
                </h2>

                <p className="text-gray-500 mt-2">
                  Click <strong>"Add Student"</strong> to create your first student.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;