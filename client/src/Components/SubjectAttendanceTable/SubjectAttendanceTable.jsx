function SubjectAttendanceTable({ subjects }) {
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
                    0
                  </td>

                  <td className="px-4 py-4 text-center">
                    0
                  </td>

                  <td className="px-4 py-4 text-center">
                    0%
                  </td>

                  <td className="px-4 py-4 text-center">

                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">

                      Low

                    </span>

                  </td>

                  <td className="px-4 py-4 text-center">

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg">

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