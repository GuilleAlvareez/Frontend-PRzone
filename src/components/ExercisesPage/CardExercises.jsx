import { TrashIcon, EditIcon } from "../Icons";

export function CardExercises({ id, name, visibility, category, user, onDelete, onEdit, onViewDetails }) {
  const handleEdit = () => {
    // Llamar a la función onEdit con los datos del ejercicio
    onEdit({
      id,
      nombre: name,
      visibilidad: visibility,
      category: category
    });
  };

  return (
    <div
      key={id}
      className="group bg-white dark:bg-gray-800 flex flex-col justify-between rounded-lg shadow-sm hover:shadow-md p-5 transition-all duration-200 border border-gray-100 dark:border-gray-700 h-full"
    >
      <div className="flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white transition-colors duration-300">{name}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              visibility === "public"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            } transition-colors duration-300`}
          >
            {visibility === "public" ? "Public" : "Private"}
          </span>
        </div>
        
        {category && category.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {category.map((cat, index) => {
              const categoryName = typeof cat === 'object' ? (cat.nombre || cat.name) : cat;
              return (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full transition-colors duration-300"
                >
                  {categoryName}
                </span>
              );
            })}
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700 mt-auto transition-colors duration-300">
        {user && (user.admin === 1 || user && visibility === user.displayUsername.toLowerCase()) ? (
          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-in-out">
            <button onClick={handleEdit} className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300">
              <EditIcon with={20} height={20}/>
            </button>
            <button onClick={onDelete} className="text-sm text-gray-500 dark:text-gray-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors duration-300">
              <TrashIcon with={20} height={20}/>
            </button>
          </div>
        ) : <div></div>}
        <button 
          onClick={onViewDetails}
          className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium transition-colors duration-300">
          View Details
        </button>
      </div>
    </div>
  );
}
