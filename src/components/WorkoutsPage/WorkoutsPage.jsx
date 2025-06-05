import { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../../context/SideBarContext";
import { NavBar } from "../Dashboard/NavBar";
import { Header } from "../Dashboard/Header";
import { WorkoutsList } from "./WorkoutsList";
import { WorkoutForm } from "./WorkoutForm";

export function WorkoutsPage() {
  const { sideBarOpen, toggleSideBar } = useContext(SidebarContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState(null); // Inicialmente null hasta que se cargue
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true); // Inicia en true para mostrar carga inicialmente
  const [error, setError] = useState(null);

  // 1. Obtener el usuario actual al montar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUser();
      if (userData) {
        setUser(userData);
      } else {
        setError("Failed to load user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        const userData = await response.json();
        return userData.user;
      } else {
        console.error("Error fetching user, status:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  // 2. Funciones para obtener datos que dependen del usuario
  const fetchWorkouts = async () => {
    // IMPRESCINDIBLE: No intentar cargar workouts si no hay usuario o ID de usuario
    if (!user || !user.id) {
      setWorkouts([]); // Limpiar workouts si no hay usuario
      setLoading(false); // Detener la carga si no podemos continuar
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:3000/workouts/${user.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error fetching workouts: ${response.status}`);
      }

      const data = await response.json();
      setWorkouts(data.results || []);
    } catch (err) {
      console.error("Error loading workouts:", err);
      setError(err.message || "Failed to load workouts");
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchExercises = async () => {
    // No intentar cargar ejercicios si no hay usuario o nombre de usuario
    if (!user || !user.name) { 
      setExercises([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/exercises/${user.name}`, { 
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error fetching exercises: ${response.status}`);
      }

      const data = await response.json();
      setExercises(data.results || []);
    } catch (err) {
      console.error("Error loading exercises:", err);
      setExercises([]);
    }
  };

  // 3. useEffect para cargar datos dependientes del usuario (workouts y exercises)
  useEffect(() => {
    if (user) { // Solo proceder si 'user' tiene un valor
      fetchWorkouts();
      fetchExercises();
    } else {
      setWorkouts([]);
      setExercises([]);
    }
  }, [user]); // La dependencia [user] es la clave aquí

  const handleWorkoutCreated = () => {
    fetchWorkouts(); // Recargar la lista de workouts después de crear uno nuevo
    setShowAddForm(false);
  };

  const handleWorkoutDeleted = () => {
    fetchWorkouts()
  };
  
  return (
    <div className="w-screen h-screen flex bg-white dark:bg-gray-900">
      <NavBar />

      <div
        className={`flex flex-col flex-1 h-full transition-all duration-300 ${
          sideBarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Header toggleSideBar={toggleSideBar} />

        <div className="flex-1 p-5 overflow-auto bg-gray-50 dark:bg-gray-900 relative z-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Workouts</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Track and manage your training sessions
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 self-start"
            >
              <span>{showAddForm ? "Cancel" : "+ Add Workout"}</span>
            </button>
          </div>

          {showAddForm && (
            <WorkoutForm 
              onWorkoutCreated={handleWorkoutCreated} 
              exercises={exercises}
              user={user}
            />
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-red-700 dark:text-red-200">
              {error}
            </div>
          ) : (
            <WorkoutsList 
              workouts={workouts} 
              onDelete={handleWorkoutDeleted}
              user={user}
            />
          )}
        </div>
      </div>
    </div>
  );
}
