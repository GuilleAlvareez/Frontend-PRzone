import { useContext, useState } from "react";
import { SidebarContext } from "../../context/SideBarContext";
import { NavBar } from "../Dashboard/NavBar";
import { Header } from "../Dashboard/Header";
import { WorkoutsList } from "./WorkoutsList";
import { WorkoutForm } from "./WorkoutForm";
import { useAuth } from "../../hooks/useAuth";
import { useWorkouts } from "../../hooks/useWorkouts";
import { useExercises } from "../../hooks/useExercises";

export function WorkoutsPage() {
  const { user, isLoading: isAuthLoading } = useAuth();

  const {
    workouts,
    isLoading: areWorkoutsLoading,
    error: workoutsError,
    addWorkout,
    removeWorkout,
    selectedWorkoutDetails,
    isDetailsLoading,
    fetchWorkoutDetails,
    clearWorkoutDetails,
  } = useWorkouts(user?.id);

  const { exercises } = useExercises(user?.displayUsername, user?.id);
  const { sideBarOpen } = useContext(SidebarContext);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleWorkoutCreated = async (workoutData) => {
    try {
      const dataToSend = { ...workoutData, usuarioId: user.id };

      await addWorkout(dataToSend);
      setShowAddForm(false);
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

  const isLoading = isAuthLoading || areWorkoutsLoading;
  const error = workoutsError;

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

          {showAddForm && user && (
            <WorkoutForm
              onWorkoutCreated={handleWorkoutCreated}
              exercises={exercises}
            />
          )}

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
              selectedWorkoutDetails={selectedWorkoutDetails}
              isDetailsLoading={isDetailsLoading}
              onDelete={handleDeleteClick}
              onViewDetails={fetchWorkoutDetails} 
              onCloseDetails={clearWorkoutDetails}
            />
          )}
        </div>
      </div>
    </div>
  );
}