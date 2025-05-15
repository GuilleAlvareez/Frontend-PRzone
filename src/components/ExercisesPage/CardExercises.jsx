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
      className="bg-white flex flex-col justify-between rounded-lg shadow-sm hover:shadow-md p-5 transition-all duration-200 border border-gray-100 h-full"
    >
      <div className="flex-1">
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
        
        {/* Mostrar categoría principal */}
        {/* <div className="flex items-center gap-2 mb-2">
          <span className="inline-block w-2 h-2 rounded-full bg-purple-500"></span>
          <p className="text-gray-600 text-sm">Hola</p>
        </div> */}
        
        {/* Mostrar músculos trabajados */}
        {category && category.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 items-start">
              {category[0].flat().map((muscle, index) => (
                <div key={`${muscle.id}-${index}`} className="flex items-center gap-1.5 mr-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-500 "></span>
                  <p className="text-gray-600 text-sm m-0">{muscle.nombre}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-auto">
        {user && user.admin === 1 ? (
          <div className="flex gap-3">
            <button className="text-sm text-gray-500 hover:text-blue-700">
              Edit
            </button>
            <button onClick={handleDelete} className="text-sm text-gray-500 hover:text-rose-700">
              Delete
            </button>
          </div>
        ) : <div></div>}
        <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
          View Details
        </button>
      </div>

    </div>
  );
}
