import { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../../context/SideBarContext";
import { NavBar } from "../Dashboard/NavBar";
import { Header } from "../Dashboard/Header";
import ChartComponent from "./ChartComponent";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useExercises } from "@/hooks/useExercises";
import { useProgress } from "@/hooks/useProgress";

export function ProgressPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { exercises, isLoading: areExercisesLoading } = useExercises(user?.displayUsername, user?.id);

  const {
    exerciseProgressData,
    isLoading: isProgressLoading,
    error: progressError,
    fetchExerciseProgress,
  } = useProgress();

  const { sideBarOpen } = useContext(SidebarContext);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);

  // Efecto para seleccionar el primer ejercicio de la lista una vez que se carga.
  useEffect(() => {
    if (!areExercisesLoading && exercises.length > 0 && !selectedExerciseId) {
      setSelectedExerciseId(exercises[0].id);
    }
  }, [exercises, areExercisesLoading, selectedExerciseId]);

  // Efecto para cargar los datos del gráfico cuando cambia el ejercicio seleccionado.
  useEffect(() => {
    if (selectedExerciseId) {
      fetchExerciseProgress(selectedExerciseId);
    }
  }, [selectedExerciseId, fetchExerciseProgress]);

  const handleExerciseChange = (value) => {
    setSelectedExerciseId(value);
  };

  if (isAuthLoading || areExercisesLoading) {
    return (
      <div className="w-screen h-screen flex bg-white dark:bg-gray-900">
        <NavBar />
        <div className={`flex flex-col flex-1 h-full transition-all duration-300 ${sideBarOpen ? "ml-64" : "ml-0"}`}>
          <Header />
          <div className="flex-1 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex bg-white dark:bg-gray-900">
      <NavBar />
      <div className={`flex flex-col flex-1 h-full transition-all duration-300 ${sideBarOpen ? "ml-64" : "ml-0"}`}>
        <Header />
        <div className="flex-1 p-5 overflow-auto bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Progress Analysis</h1>
              <p className="text-gray-500 dark:text-gray-400">Track your performance over time</p>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="exercise-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Exercise
            </label>
            <Select onValueChange={handleExerciseChange} value={selectedExerciseId || ''}>
              <SelectTrigger className="w-full md:w-[280px]">
                <SelectValue placeholder="Select an exercise" />
              </SelectTrigger>
              <SelectContent>
                {exercises.length > 0 ? (
                  exercises.map((exercise) => (
                    <SelectItem key={exercise.id} value={exercise.id}>
                      {exercise.nombre}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>No exercises available</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {isProgressLoading ? (
            <div className="text-center p-10">Cargando progreso...</div>
          ) : progressError ? (
            <div className="text-center p-10 text-red-500">Error: {progressError.message}</div>
          ) : exerciseProgressData.length > 0 ? (
            <ChartComponent data={exerciseProgressData} />
          ) : (
            <div className="text-center p-10 text-gray-500">No progress data found for this exercise.</div>
          )}
        </div>
      </div>
    </div>
  );
}