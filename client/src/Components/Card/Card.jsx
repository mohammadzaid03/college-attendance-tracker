function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-gray-500 text-sm font-medium">
        {title}
      </h3>

      <p className="text-3xl font-bold text-blue-600 mt-3">
        {value}
      </p>
    </div>
  );
}

export default Card;