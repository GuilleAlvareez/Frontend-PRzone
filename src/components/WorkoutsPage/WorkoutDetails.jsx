export function WorkoutDetails({ workout, onClose }) {
  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    return date.toLocaleDateString();
  };

  // Renderizar estrellas para la valoración
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`text-xl ${i <= rating ? "text-yellow-500" : "text-gray-300"}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    
    <div 
      className="fixed inset-0 z-40 bg-black bg-opacity-30"
      onClick={onClose}
    >
      
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto z-50"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">{workout.nombre}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{formatDate(workout.fecha)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Rating</p>
              <div className="flex">{renderRating(workout.valoracion)}</div>
            </div>
          </div>
          
          {workout.comentarios && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Comments</p>
              <p className="text-gray-700">{workout.comentarios}</p>
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Exercises</h3>
            
            {workout.ejercicios && workout.ejercicios.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Exercise</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sets</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reps</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Est. 1RM</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {workout.ejercicios.map((exercise) => (
                      <tr key={exercise.id}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
                          {exercise.nombre || exercise.ejercicio_nombre}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{exercise.peso} kg</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{exercise.series}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{exercise.repeticiones}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {exercise.rm_estimado ? `${exercise.rm_estimado} kg` : '-'}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">{exercise.observaciones || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No exercises found for this workout.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



