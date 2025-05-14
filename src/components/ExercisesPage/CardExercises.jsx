export function CardExercises({ id, name, visibility, category, user, onDelete }) {

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/exercises/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error deleting exercise");
      }

      onDelete(id);
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  }

  return (
    <div
      key={id}
      className="bg-white rounded-lg shadow-sm hover:shadow-md p-5 transition-all duration-200 border border-gray-100"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg">{name}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            visibility === "public"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {visibility}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-block w-2 h-2 rounded-full bg-purple-500"></span>
        <p className="text-gray-600 text-sm">{category}</p>
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <div className="flex gap-3">
          <button className="text-sm text-gray-500 hover:text-gray-700">
            Edit
          </button>
          {user && (
            user.admin === 1 ? 
              <button onClick={handleDelete} className="text-sm text-gray-500 hover:text-rose-700">
              Delete
            </button>
            : null
          )}
        </div>
        <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
          View Details
        </button>
      </div>
    </div>
  );
}
