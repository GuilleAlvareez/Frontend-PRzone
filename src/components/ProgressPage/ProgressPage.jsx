import { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../../context/SideBarContext";
import { NavBar } from "../Dashboard/NavBar";
import { Header } from "../Dashboard/Header";
import ChartComponent from "./ChartComponent";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- NUEVOS IMPORTS DE HOOKS ---
import { useAuth } from "@/hooks/useAuth";
import { useExercises } from "@/hooks/useExercises";
import { useProgress } from "@/hooks/useProgress";

export function ProgressPage() {
  // --- USO DE HOOKS PARA OBTENER DATOS Y LÓGICA ---

  // 1. Obtenemos el usuario para saber qué lista de ejercicios cargar.
  const { user, isLoading: isAuthLoading } = useAuth();

  // 2. Obtenemos la lista de ejercicios disponibles para el selector.
  //    El hook se encarga de la carga y los errores.
  const { exercises, isLoading: areExercisesLoading } = useExercises(user?.displayUsername, user?.id);

  // 3. Usamos el hook de progreso para obtener los datos del gráfico y la función para cargarlos.
  const {
    exerciseProgressData,
    isLoading: isProgressLoading,
    error: progressError,
    fetchExerciseProgress,
  } = useProgress();

  // --- ESTADO LOCAL DEL COMPONENTE (UI) ---
  // Solo necesitamos estado para la UI: el ejercicio seleccionado y el estado del sidebar.
  const { sideBarOpen } = useContext(SidebarContext);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);

  // --- EFECTOS PARA COORDINAR LOS HOOKS ---

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
  }, [selectedExerciseId, fetchExerciseProgress]); // fetchExerciseProgress está memorizado con useCallback en el hook

  // --- MANEJADORES DE EVENTOS (HANDLERS) ---
  const handleExerciseChange = (value) => {
    // El valor del Select de shadcn/ui ya es el `id` del ejercicio.
    setSelectedExerciseId(value);
  };

  // --- RENDERIZADO DEL COMPONENTE ---

  // Estado de carga principal mientras se obtienen los datos iniciales.
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

          {/* Renderizado condicional para el gráfico */}
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