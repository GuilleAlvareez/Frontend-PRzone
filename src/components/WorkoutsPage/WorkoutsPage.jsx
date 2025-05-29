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
  const [user, setUser] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener usuario actual
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();

      if (userData) {
        setUser(userData);
      }
    };

    fetchUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        return userData.user;
      } else {
        throw new Error("Error fetching user");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }

  // Obtener entrenamientos
  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/workouts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error fetching workouts");
      }

      const data = await response.json();
      setWorkouts(data.results || []);
    } catch (error) {
      console.error("Error loading workouts:", error);
      setError("Failed to load workouts");
    } finally {
      setLoading(false);
    }
  };

  // Obtener ejercicios disponibles para el formulario
  const fetchExercises = async () => {
    try {
      const response = await fetch("http://localhost:3000/exercises", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error fetching exercises");
      }

      const data = await response.json();
      setExercises(data.results || []);
    } catch (error) {
      console.error("Error loading exercises:", error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
    fetchExercises();
  }, []);

  // Manejar la creación de un nuevo entrenamiento
  const handleWorkoutCreated = () => {
    fetchWorkouts();
    setShowAddForm(false);
  };

  // Manejar la eliminación de un entrenamiento
  const handleWorkoutDeleted = (deletedId) => {
    setWorkouts(workouts.filter(workout => workout.id !== deletedId));
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
