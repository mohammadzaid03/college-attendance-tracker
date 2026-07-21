function SubjectTable({
  subjects,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
      <table className="min-w-full">
        <thead className="bg-blue-600 text-white uppercase text-sm tracking-wide">
          <tr>
            <th className="px-5 py-4 text-left">Subject Name</th>
            <th className="px-5 py-4 text-left">Subject Code</th>
            <th className="px-5 py-4 text-left">Branch</th>
            <th className="px-5 py-4 text-left">Semester</th>
            <th className="px-5 py-4 text-center">Credits</th>
            <th className="px-5 py-4 text-left">Faculty</th>
            <th className="px-5 py-4 text-center">Type</th>
            <th className="px-5 py-4 text-center">Status</th>
            <th className="w-56 px-5 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {subjects.length > 0 ? (
            subjects.map((subject) => (
              <tr
                key={subject._id}
                className="border-b hover:bg-blue-50 hover:scale-[1.01] transition-all duration-200"
              >
                <td className="px-5 py-4 font-medium">
                  {subject.subjectName}
                </td>

                <td className="px-5 py-4">
                  {subject.subjectCode}
                </td>

                <td className="px-5 py-4">
                  {subject.branch}
                </td>

                <td className="px-5 py-4">
                  {subject.semester}
                </td>

                <td className="px-5 py-4 text-center">
                  {subject.credits}
                </td>

                <td className="px-5 py-4">
                  {subject.facultyName}
                </td>

                <td className="px-5 py-4 text-center">
                  {subject.subjectType}
                </td>

                <td className="px-5 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      subject.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {subject.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(subject)}
                      className="bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg transition-all text-white px-4 py-2 rounded-lg"
                    >
                      ✏ Edit
                    </button>

                    <button
                      onClick={() => onDelete(subject)}
                      className="bg-red-600 hover:bg-red-700 hover:shadow-lg transition-all text-white px-4 py-2 rounded-lg"
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
                colSpan="9"
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">
                  📚
                </div>

                <h2 className="text-2xl font-bold text-gray-700">
                  No Subjects Found
                </h2>

                <p className="text-gray-500 mt-2">
                  Add your first subject to begin managing attendance.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SubjectTable;