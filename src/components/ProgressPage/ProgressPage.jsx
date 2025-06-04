import { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../../context/SideBarContext";
import { NavBar } from "../Dashboard/NavBar";
import { Header } from "../Dashboard/Header";
import ChartComponent from "./ChartComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProgressPage() {
  const { sideBarOpen, toggleSideBar } = useContext(SidebarContext);
  const [exerciseData, setExerciseData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exercises, setExercises] = useState([]);

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

  const fetchingExerciseSelected = async (nameExercise) => {
    const response = await fetch(`http://localhost:3000/exercises/progress/${nameExercise}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) throw new Error("Error fetching exercise progress");
    const data = await response.json();
    setExerciseData(data);
  };

  useEffect(() => {
    if (selectedExercise) {
      fetchingExerciseSelected(selectedExercise);
    }
  }, [selectedExercise]);

  const handleChange = (value) => {
    console.log("Selected exercise:", value);
    setSelectedExercise(value);
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
            <Select onValueChange={handleChange} value={selectedExercise}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a exercise" />
              </SelectTrigger>
              <SelectContent>
                {exercises.map((exercise) => (
                <SelectItem key={exercise.id} value={exercise.id}>
                  {exercise.nombre}
                </SelectItem>
              ))}
              </SelectContent>
            </Select>
            {/* <select
              id="exercise-select"
              value={selectedExercise || ""}
              onChange={handleChange}
              className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {exercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.nombre}
                </option>
              ))}
            </select> */}
          </div>

            <ChartComponent data={exerciseData} />
        </div>
      </div>
    </div>
  );
}

