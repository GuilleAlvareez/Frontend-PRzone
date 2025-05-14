import { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../../context/SideBarContext";
import { NavBar } from "../Dashboard/NavBar";
import { Header } from "../Dashboard/Header";
import { CardExercises } from "./CardExercises";
import { FormAdd } from "./FormAdd";

export function ExercisesPage() {
  const { sideBarOpen, toggleSideBar } = useContext(SidebarContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: "",
    visibility: "private",
    muscles: [],
    category: [],
  });
  const [user, setUser] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [exercises, setExercises] = useState([]);

  // const exercises = [
  //   { id: 1, name: "Bench Press", category: "Chest", visibility: "public" },
  //   { id: 2, name: "Squat", category: "Legs", visibility: "public" },
  //   { id: 3, name: "Deadlift", category: "Back", visibility: "public" },
  //   { id: 4, name: "Pull-up", category: "Back", visibility: "public" },
  //   { id: 5, name: "Push-up", category: "Chest", visibility: "public" },
  //   {
  //     id: 6,
  //     name: "Shoulder Press",
  //     category: "Shoulders",
  //     visibility: "public",
  //   },
  //   { id: 7, name: "Bicep Curl", category: "Arms", visibility: "public" },
  //   { id: 8, name: "Tricep Extension", category: "Arms", visibility: "public" },
  //   { id: 9, name: "Leg Press", category: "Legs", visibility: "public" },
  //   { id: 10, name: "Lat Pulldown", category: "Back", visibility: "public" },
  //   { id: 11, name: "Leg Curl", category: "Legs", visibility: "public" },
  //   { id: 12, name: "Chest Fly", category: "Chest", visibility: "public" },
  // ];

  // const categories = [
  //   "All",
  //   "Chest",
  //   "Back",
  //   "Legs",
  //   "Arms",
  //   "Shoulders",
  //   "Other",
  // ];

  const categories = [
    { id: 0, name: "All" },
  { id: 1, name: "Chest" },
  { id: 2, name: "Back" },
  { id: 3, name: "Legs" },
  { id: 4, name: "Arms" },
  { id: 5, name: "Shoulders" },
  { id: 6, name: "Other" },
  // ... más categorías con sus IDs
];

  const handleExerciseDeleted = (deletedId) => {
    setExercises((prevExercises) => prevExercises.filter(e => e.id !== deletedId));
  };

  const filteredExercises =
    filterCategory === "All"
      ? exercises
      : exercises.filter((exercise) => exercise.category === filterCategory);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      if (userData) {
        setUser(userData); // Aunque ya se hace en getUser, puedes quitar esto si prefieres
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

  const handleInputChange = async (e) => {
    const { name, value, checked, options, type } = e.target;

    if (name === "muscles") {
      // ... (sin cambios si ya manejas IDs)
    } else if (name === "category") {
      const selectedCategoryIds = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => parseInt(opt.value, 10)); // Convertir el ID (string) a número
      setNewExercise((prev) => ({ ...prev, category: selectedCategoryIds }));
    } else {
      setNewExercise((prev) => ({ ...prev, [name]: value }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // const username = await getUser();
    // if (!username) {
    //   console.error("Error fetching user");
    //   return;
    // }

    const exerciseToSend = {
      ...newExercise,
      username: user.username,
    };
    console.log(exerciseToSend);
    const response = await fetch("http://localhost:3000/exercises/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exerciseToSend),
    })

    if (!response.ok) {
      throw new Error('Error al crear el ejercicio');
    }

    setNewExercise({ name: "", visibility: "private", category: [] });
    setShowAddForm(false);
  };

  useEffect(() => {
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

      const exercises = await response.json();
      setExercises(exercises.results);
    } catch (error) {
      console.error("Error loading exercises:", error);
    }
  };

  fetchExercises();

  }, []);

  return (
    <div className="w-screen h-screen flex">
      <NavBar sideBarOpen={sideBarOpen} />

      <div
        className={`flex flex-col flex-1 h-full transition-all duration-300 ${
          sideBarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Header toggleSideBar={toggleSideBar} />

        <div className="flex-1 p-5 overflow-auto bg-gray-50">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Exercises Library</h1>
              <p className="text-gray-500">
                Manage and track your exercise collection
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-2 self-start"
            >
              <span>{showAddForm ? "Cancel" : "+ Add Exercise"}</span>
            </button>
          </div>

          {/* <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => {
                    setFilterCategory(category);
                  }}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    filterCategory === category
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div> */}

          {/* Add exercise form */}
          {showAddForm && (
            <FormAdd
              newExercise={newExercise}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              categories={categories}
            />
          )}

          {/* Exercises grid */}
          {exercises.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {exercises.map(({ id, nombre, visibilidad, category }) => {
                return (
                  <CardExercises
                    key={id}
                    id={id}
                    name={nombre}
                    visibility={visibilidad}
                    category={category}
                    user={user}
                    onDelete={handleExerciseDeleted}
                  />
                );
              })}

            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-500">
                No exercises found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
