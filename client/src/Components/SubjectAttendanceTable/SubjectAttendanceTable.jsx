function SubjectAttendanceTable({
  subjects,
  onView,
}) {
    return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="px-4 py-3 text-left">S.No</th>

              <th className="px-4 py-3 text-left">Subject</th>

              <th className="px-4 py-3 text-left">Code</th>

              <th className="px-4 py-3 text-center">
                Conducted
              </th>

              <th className="px-4 py-3 text-center">
                Attended
              </th>

              <th className="px-4 py-3 text-center">
                Attendance %
              </th>

              <th className="px-4 py-3 text-center">
                Status
              </th>

              <th className="px-4 py-3 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {subjects.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-10 text-gray-500"
                >
                  No Subjects Found
                </td>

              </tr>

            ) : (

              subjects.map((subject, index) => (

                <tr
                  key={subject._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="px-4 py-4">
                    {index + 1}
                  </td>

                  <td className="px-4 py-4 font-semibold">
                    {subject.subjectName}
                  </td>

                  <td className="px-4 py-4">
                    {subject.subjectCode}
                  </td>

                  <td className="px-4 py-4 text-center">
                  {subject.conducted}
                  </td>

                  <td className="px-4 py-4 text-center">
                  {subject.attended}
                  </td>
                  <td className="px-4 py-4 text-center">
                  {subject.percentage}%
                  </td>

                  <td className="px-4 py-4 text-center">

                    <span
  className={`px-3 py-1 rounded-full text-sm font-medium
    ${
      subject.status === "Excellent"
        ? "bg-green-100 text-green-700"
        : subject.status === "Good"
        ? "bg-emerald-100 text-emerald-700"
        : subject.status === "Average"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
    }`}
>
  {subject.status}
</span>

                  </td>

                  <td className="px-4 py-4 text-center">

                   <button
  onClick={() => onView(subject._id)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg"
>
  View
</button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default SubjectAttendanceTable;