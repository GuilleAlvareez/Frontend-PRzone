import { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../../context/SideBarContext";
import { NavBar } from "../Dashboard/NavBar";
import { Header } from "../Dashboard/Header";
import ChartComponent from "./ChartComponent";

export function ProgressPage() {
  const { sideBarOpen, toggleSideBar } = useContext(SidebarContext);
  const [user, setUser] = useState(null);
  const [exerciseData, setExerciseData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exercises, setExercises] = useState([]);

  const initialData = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
];

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/me", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Error fetching user");
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // Fetch exercises
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("http://localhost:3000/exercises", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Error fetching exercises");
        const data = await response.json();
        setExercises(data.results || []);
        if (data.results && data.results.length > 0) {
          setSelectedExercise(data.results[0].id);
        }
      } catch (error) {
        console.error("Error loading exercises:", error);
      }
    };

    fetchExercises();
  }, []);


  return (
    <div className="w-screen h-screen flex bg-white dark:bg-gray-900">
      <NavBar />

      <div
        className={`flex flex-col flex-1 h-full transition-all duration-300 ${
          sideBarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Header toggleSideBar={toggleSideBar} />

        <div className="flex-1 p-5 overflow-auto bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Progress Analysis</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Track your performance over time
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="exercise-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Exercise
            </label>
            <select
              id="exercise-select"
              value={selectedExercise || ""}
              onChange={(e) => setSelectedExercise(e.target.value)}
              className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {exercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.nombre}
                </option>
              ))}
            </select>
          </div>

            <ChartComponent data={initialData} />
        </div>
      </div>
    </div>
  );
}