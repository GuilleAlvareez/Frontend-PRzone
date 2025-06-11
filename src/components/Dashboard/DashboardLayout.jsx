import { useEffect, useState, useMemo } from "react";
import { RecentWorkoutCard } from "./RecentWorkoutCard";
import { CardMostUsed } from "./CardMostUsed";

// --- NUEVOS IMPORTS DE HOOKS ---
import { useAuth } from "../../hooks/useAuth";
import { useWorkouts } from "../../hooks/useWorkouts";
import { useExercises } from "../../hooks/useExercises";
import { workoutService } from '../../services/workoutServices'; // Importamos el servicio directamente para una función específica

export function DashboardLayout() {
  // --- USO DE HOOKS PARA OBTENER DATOS Y LÓGICA ---

  // 1. Obtenemos el usuario.
  const { user, isLoading: isAuthLoading } = useAuth();

  // 2. Obtenemos los workouts recientes y el número total de workouts.
  const { 
    workouts, // Lista completa de workouts
    recentWorkouts, 
    isLoading: areWorkoutsLoading 
  } = useWorkouts(user?.id);

  // 3. Obtenemos los ejercicios más usados.
  const { 
    mostUsedExercises, 
    isLoading: areExercisesLoading 
  } = useExercises(user?.displayUsername, user?.id); // Asumiendo que useExercises también puede manejar esto.
                               // Si no, se puede crear un hook específico o llamar al servicio.
                               // Por simplicidad, lo he añadido a useExercises en el plan.

  // --- ESTADO LOCAL DEL COMPONENTE ---
  // Solo mantenemos el estado que es calculado o específico de este componente.
  const [totalWeight, setTotalWeight] = useState(0);
  const [isLoadingTotalWeight, setIsLoadingTotalWeight] = useState(false);

  // --- LÓGICA DE CÁLCULO (MOVIDA A UN USEEFFECT) ---
  // Este efecto calcula el peso total levantado cuando los workouts recientes cambian.
  useEffect(() => {
    // Si no hay workouts recientes, el peso total es 0.
    if (!recentWorkouts || recentWorkouts.length === 0) {
      setTotalWeight(0);
      return;
    }

    const calculateTotalWeight = async () => {
      setIsLoadingTotalWeight(true);
      try {
        // Hacemos todas las llamadas a la API en paralelo para obtener los detalles de cada workout reciente.
        // Usamos el servicio directamente aquí porque es una operación muy específica del dashboard.
        const detailsPromises = recentWorkouts.map(workout => 
          workoutService.getWorkoutDetails(workout.id)
        );
        const workoutsWithDetails = await Promise.all(detailsPromises);

        // Aplanamos el array de arrays de ejercicios y calculamos el total.
        const total = workoutsWithDetails
          .flatMap(workout => workout.ejercicios || []) // flatMap es como map seguido de flat(1)
          .reduce((acc, exercise) => {
            return acc + (exercise.peso * exercise.repeticiones * exercise.series);
          }, 0);

        setTotalWeight(total);
      } catch (error) {
        console.error("Error calculating total weight:", error);
        setTotalWeight(0); // Resetea en caso de error
      } finally {
        setIsLoadingTotalWeight(false);
      }
    };

    calculateTotalWeight();
  }, [recentWorkouts]); // Se recalcula solo cuando cambian los workouts recientes.

  // --- CÁLCULOS DERIVADOS (USANDO USEMEMO) ---
  // useMemo es ideal para cálculos que no necesitan estado, solo dependen de otros datos.
  const totalExercisesDone = useMemo(() => {
    return workouts.reduce((acc, workout) => acc + workout.numero_ejercicios, 0);
  }, [workouts]); // Se recalcula solo si la lista completa de workouts cambia.

  const colorsCard = ["border-blue-500", "border-purple-500", "border-green-500"];

  // --- RENDERIZADO DEL COMPONENTE ---
  // El renderizado ahora es más limpio y se basa en los estados de carga de los hooks.
  const isLoading = isAuthLoading || areWorkoutsLoading || areExercisesLoading;

  if (isLoading) {
    return (
      <div className="flex-1 p-5 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-5 overflow-auto bg-gray-50 dark:bg-gray-900">
      {/* Stats Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">General Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 border-t-4 border-blue-500 rounded-lg p-5 shadow-md ...">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total Weight Lifted</h3>
            {isLoadingTotalWeight ? (
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">Calculating...</p>
            ) : (
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{totalWeight} kg</p>
            )}
          </div>
          <div className="bg-white dark:bg-gray-800 border-t-4 border-purple-500 rounded-lg p-5 shadow-md ...">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Workouts Completed</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{workouts.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border-t-4 border-green-500 rounded-lg p-5 shadow-md ...">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Exercises Done</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{totalExercisesDone}</p>
          </div>
        </div>
      </section>

      {/* Workouts Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Recent Workouts</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {recentWorkouts.length > 0 ? (
            recentWorkouts.map((workout) => (
              <RecentWorkoutCard key={workout.id} {...workout} />
            ))
          ) : (
            <p className="p-4 text-gray-500">No recent workouts found.</p>
          )}
        </div>
      </section>

      {/* Popular Exercises Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Favorite exercises</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mostUsedExercises.length > 0 ? (
            mostUsedExercises.map((exercise, index) => (
              <CardMostUsed key={exercise.ejercicio} ejercicio={exercise.ejercicio} veces_realizado={exercise.veces_realizado} color={colorsCard[index]} />
            ))
          ) : (
            <p className="p-4 text-gray-500">No favorite exercises data yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}