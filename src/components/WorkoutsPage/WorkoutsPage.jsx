import { useContext, useState } from "react";
import { SidebarContext } from "../../context/SideBarContext";
import { NavBar } from "../Dashboard/NavBar";
import { Header } from "../Dashboard/Header";
import { WorkoutsList } from "./WorkoutsList";
import { WorkoutForm } from "./WorkoutForm";

// --- NUEVOS IMPORTS DE HOOKS ---
import { useAuth } from "../../hooks/useAuth";
import { useWorkouts } from "../../hooks/useWorkouts";
import { useExercises } from "../../hooks/useExercises";

export function WorkoutsPage() {
  // --- USO DE HOOKS PARA OBTENER DATOS Y LÓGICA ---

  // 1. Obtenemos el usuario. Su estado de carga nos servirá como indicador principal.
  const { user, isLoading: isAuthLoading } = useAuth();

  // 2. Obtenemos los datos y funciones de los workouts, pasándole el ID del usuario.
  //    El hook se encarga de la carga, errores y refresco.
  const {
    workouts,
    isLoading: areWorkoutsLoading,
    error: workoutsError,
    addWorkout,
    removeWorkout,
    // --- Obtenemos las nuevas funciones y estados del hook ---
    selectedWorkoutDetails,
    isDetailsLoading,
    fetchWorkoutDetails,
    clearWorkoutDetails,
  } = useWorkouts(user?.id);

  // 3. Obtenemos la lista de ejercicios para pasarla al formulario.
  //    No necesitamos su estado de carga aquí, ya que el principal es el de los workouts.
  const { exercises } = useExercises(user?.displayUsername, user?.id);

  // --- ESTADO LOCAL DEL COMPONENTE (UI) ---
  const { sideBarOpen } = useContext(SidebarContext);
  const [showAddForm, setShowAddForm] = useState(false);

  // --- MANEJADORES DE EVENTOS (HANDLERS) ---
  // Simples, directos, y llaman a las funciones de los hooks.

  const handleWorkoutCreated = async (workoutData) => {
    try {
      // Añadimos el ID del usuario a los datos del formulario antes de enviarlos.
      const dataToSend = { ...workoutData, usuarioId: user.id };
      console.log("Enviando datos de entrenamiento:", dataToSend);
      await addWorkout(dataToSend);
      setShowAddForm(false); // Cierra el formulario en caso de éxito.
    } catch (error) {
      console.error("Failed to create workout:", error);
    }
  };

  const handleDeleteClick = async (workoutId) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        await removeWorkout(workoutId);
      } catch (error) {
        console.error("Failed to delete workout:", error);
        alert(`Error al borrar el entrenamiento: ${error.message}`);
      }
    }
  };

  // --- RENDERIZADO DEL COMPONENTE ---

  // Combinamos los estados de carga para un indicador de carga inicial.
  const isLoading = isAuthLoading || areWorkoutsLoading;
  const error = workoutsError; // Podríamos combinar errores si fuera necesario.

  return (
    <div className="w-screen h-screen flex bg-white dark:bg-gray-900">
      <NavBar />
      <div className={`flex flex-col flex-1 h-full transition-all duration-300 ${sideBarOpen ? "ml-64" : "ml-0"}`}>
        <Header />
        <div className="flex-1 p-5 overflow-auto bg-gray-50 dark:bg-gray-900 relative">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Workouts</h1>
              <p className="text-gray-500 dark:text-gray-400">Track and manage your training sessions</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 self-start"
            >
              <span>{showAddForm ? "Cancel" : "+ Add Workout"}</span>
            </button>
          </div>

          {/* El formulario solo se muestra si el usuario está logueado */}
          {showAddForm && user && (
            <WorkoutForm
              onWorkoutCreated={handleWorkoutCreated}
              exercises={exercises} // Pasamos la lista de ejercicios para el selector
            />
          )}

          {/* Renderizado condicional basado en los estados de los hooks */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-red-700 dark:text-red-200">
              Error: {error.message}
            </div>
          ) : (
            <WorkoutsList 
              workouts={workouts} 
              user={user}
              // --- Pasamos las nuevas props ---
              selectedWorkoutDetails={selectedWorkoutDetails}
              isDetailsLoading={isDetailsLoading}
              onDelete={handleDeleteClick} // Pasamos el handler que incluye la confirmación
              onViewDetails={fetchWorkoutDetails} // Pasamos la función del hook directamente
              onCloseDetails={clearWorkoutDetails} // Pasamos la función del hook directamente
            />
          )}
        </div>
      </div>
    </div>
  );
}