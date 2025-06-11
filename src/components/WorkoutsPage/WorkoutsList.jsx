import { WorkoutCard } from "./WorkoutCard";
import { WorkoutDetails } from "./WorkoutDetails";
import { useState } from "react";

// --- PROPS SIMPLIFICADAS ---
// Ahora recibe los datos y las funciones directamente del hook useWorkouts,
// pasados a través de WorkoutsPage.
export function WorkoutsList({ 
  workouts, 
  selectedWorkoutDetails, // Estado del workout seleccionado (del hook)
  isDetailsLoading,       // Estado de carga para los detalles (del hook)
  onDelete,               // Función para borrar (del hook)
  onViewDetails,          // Función para cargar detalles (del hook)
  onCloseDetails          // Función para cerrar detalles (del hook)
}) {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [workoutsPerPage] = useState(6);

  const indexOfLastworkout = currentPage * workoutsPerPage;
  const indexOfFirstworkout = indexOfLastworkout - workoutsPerPage;
  const currentworkouts = workouts.slice(indexOfFirstworkout, indexOfLastworkout);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!workouts || workouts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No workouts found. Start by adding your first workout!
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Lista de entrenamientos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {currentworkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            // Pasamos las funciones directamente a la tarjeta.
            // La lógica de confirmación y llamada al hook ya está en WorkoutsPage.
            onDelete={() => onDelete(workout.id)} 
            onViewDetails={() => onViewDetails(workout.id)}
          />
        ))}
      </div>
      
      {/* Modal de detalles */}
      {/* El modal se muestra si hay un workout seleccionado */}
      {selectedWorkoutDetails && (
        <>
          <div 
            className="fixed inset-0 bg-black/65 z-40"
            onClick={onCloseDetails} // Cierra el modal al hacer clic en el fondo
          />
          <WorkoutDetails 
            workout={selectedWorkoutDetails} 
            onClose={onCloseDetails} 
            isLoading={isDetailsLoading} // Opcional: pasar estado de carga al modal
          />
        </>
      )}

      {/* Paginación */}
      {workouts.length > workoutsPerPage && (
         <div className="flex justify-center mt-6">
              {/* Botón para ir a la página anterior */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Prev
            </button>

            {/* Renderizado de los números de página */}
            {Array.from({ length: Math.ceil(workouts.length / workoutsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 text-sm font-medium border rounded-md transition-colors duration-200 ${
                  currentPage === index + 1
                    ? 'bg-green-600 dark:bg-green-600 hover:bg-green-800 dark:bg:text-green-300 text-white'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Botón para ir a la página siguiente */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(workouts.length / workoutsPerPage)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Next
            </button>
         </div>
        )}
    </>
  );
}