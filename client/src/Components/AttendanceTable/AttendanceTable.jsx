function AttendanceTable({
  attendance,
  onEdit,
  onDelete,
  hasFilters,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

      {/* Table Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Attendance Records
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          View and manage student attendance records.
        </p>
      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">

            <tr>

             <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700 w-16">
            S.No
            </th>

            
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                Student
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                Hall Ticket
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                Subject
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                Date
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                Remarks
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {attendance.length > 0 ? (

attendance.map((record, index) => (
                <tr

                  key={record._id}
                  className="border-b border-gray-100 even:bg-gray-50 hover:bg-blue-50 transition duration-200"
                >

                  <td className="px-4 py-4 text-center">
  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold">
    {index + 1}
  </span>
</td>

                  {/* Student */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                        {record.student?.fullName?.charAt(0).toUpperCase()}
                      </div>

                      <div>

                        <h3 className="font-semibold text-gray-800">
                          {record.student?.fullName}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Student
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Hall Ticket */}
                  <td className="px-6 py-5">

                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                      {record.student?.hallTicketNo}
                    </span>

                  </td>

                  {/* Subject */}
                  <td className="px-6 py-5 text-gray-700 font-medium">
                    {record.subject?.subjectName}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-center text-gray-600">

                    {new Date(record.date).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}

                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">

                    <div className="flex justify-center">

                      {record.status === "Present" ? (

                        <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold">

                          <span className="w-2 h-2 rounded-full bg-green-500"></span>

                          Present ✓

                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-semibold">

                          <span className="w-2 h-2 rounded-full bg-red-500"></span>

                          Absent ✕

                        </span>

                      )}

                    </div>

                  </td>

                  {/* Remarks */}
                  <td className="px-6 py-5 text-gray-600">
                    {record.remarks || "-"}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">

                    <div className="flex justify-center items-center gap-2">

                      <button
                        onClick={() => onEdit(record)}
                        className="px-3 py-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition font-medium"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() => onDelete(record)}
                        className="px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition font-medium"
                      >
                        🗑️ Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="py-20"
                >

                  <div className="flex flex-col items-center justify-center">

                    
                    <div className="text-6xl mb-4">
  {hasFilters ? "🔍" : "📅"}
</div>

<h2 className="text-2xl font-bold text-gray-700">
  {hasFilters
    ? "No Matching Records"
    : "No Attendance Records"}
</h2>

<p className="text-gray-500 mt-2">
  {hasFilters
    ? "Try changing or clearing your search and filters."
    : (
      <>
        Click <strong>"Mark Attendance"</strong> to create your first attendance record.
      </>
    )}
</p>

                  </div>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AttendanceTable;