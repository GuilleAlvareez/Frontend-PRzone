import { TrashIcon } from "../Icons";

export function WorkoutCard({ workout, onDelete, onViewDetails }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString();
  };

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`text-lg ${i <= rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white dark:bg-slate-800 flex flex-col justify-between rounded-lg shadow p-6 transition-colors duration-300">
      <div className="flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{workout.nombre}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            {workout.numero_ejercicios} exercises
          </span>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
          {formatDate(workout.fecha)}
        </p>
        
        <div className="flex mb-3">
          {renderRating(workout.valoracion)}
        </div>
        
        {workout.comentarios && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
            {workout.comentarios}
          </p>
        )}
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700 mt-auto">
        <div className="flex gap-3">
          <button 
            onClick={onDelete} 
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-rose-700 dark:hover:text-rose-300"
          >
            <TrashIcon with={20} height={20}/>
          </button>
        </div>

        <button 
          onClick={onViewDetails}
          className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
}