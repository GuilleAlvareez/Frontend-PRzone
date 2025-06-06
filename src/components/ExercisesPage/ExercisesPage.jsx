import { useContext, useState, useEffect, useMemo } from "react";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editingExerciseId, setEditingExerciseId] = useState(null);

  const categories = [
    { id: 0, name: "All" },
    { id: 1, name: "Chest" },
    { id: 2, name: "Back" },
    { id: 3, name: "Legs" },
    { id: 4, name: "Arms" },
    { id: 5, name: "Shoulders" },
    { id: 6, name: "Other" },
  ];

  const handleExerciseDeleted = (deletedId) => {
    setExercises((prevExercises) => prevExercises.filter(e => e.id !== deletedId));
  };

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
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    fetchUserData();
  }, []);

  const fetchExercises = async () => {
    if (!user || !user.id) { // Evitar llamar si user no está listo
      setExercises([]); // limpiar ejercicios si no hay usuario
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/exercises/${user.name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Error fetching exercises");
      }

      const exercisesData = await response.json();
      setExercises(exercisesData.results || []);
    } catch (error) {
      console.error("Error loading exercises:", error);
      setExercises([]); // En caso de error, establece un array vacío
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [user]);

  const handleInputChange = async (e) => {
    const { name, value, options } = e.target;
    if (name === "category") {
      const selectedCategoryIds = Array.from(options).filter((opt) => opt.selected).map((opt) => parseInt(opt.value, 10));
      setNewExercise((prev) => ({ ...prev, category: selectedCategoryIds }));
    } else {
      setNewExercise((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditExercise = (exercise) => {
    setNewExercise({
      name: exercise.nombre,
      visibility: exercise.visibilidad || "private",
      category: exercise.category.map(cat => 
        typeof cat === 'object' ? cat.id : cat
      ).filter(id => id !== undefined)
    });
    setEditingExerciseId(exercise.id);
    setIsEditing(true);
    setShowAddForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("Error: User not found");
      return;
    }
    try {
      const exerciseToSend = {
        name: newExercise.name,
        username: user.username,
        category: newExercise.category
      };
      
      let url = "http://localhost:3000/exercises/new";
      let method = "POST";
      
      // Si estamos editando, cambiar URL y método
      if (isEditing && editingExerciseId) {
        url = `http://localhost:3000/exercises/update/${editingExerciseId}`;
        method = "PATCH";
      }
      
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exerciseToSend),
        credentials: "include"
      });

      if (!response.ok) throw new Error(isEditing ? 'Error al actualizar el ejercicio' : 'Error al crear el ejercicio');

      await response.json();
      
      fetchExercises(); // Recargar ejercicios
      setNewExercise({ name: "", visibility: "private", category: [] });
      setShowAddForm(false);
      setIsEditing(false);
      setEditingExerciseId(null);
    } catch (error) {
      console.error(isEditing ? "Error updating exercise:" : "Error creating exercise:", error);
    }
  };

  const filteredExercises = useMemo(() => {
    if (filterCategory === "All") return exercises;
    
    return exercises.filter(exercise => {
      if (!exercise.category || !Array.isArray(exercise.category) || exercise.category.length === 0) {
        return false;
      }
      return exercise.category.some(categoryGroup => {
        if (Array.isArray(categoryGroup)) {
          return categoryGroup.some(muscle => 
            muscle.nombre === filterCategory || muscle.name === filterCategory
          );
        } else if (typeof categoryGroup === 'object') {
          return categoryGroup.nombre === filterCategory || categoryGroup.name === filterCategory;
        }
        return categoryGroup === filterCategory;
      });
    });
  }, [exercises, filterCategory]);

  const handleAddExercise = () => {
    if (showAddForm) {
      // Si ya está abierto, lo cerramos y reseteamos el estado
      setNewExercise({ name: "", visibility: "private", category: [] });
      setIsEditing(false);
      setEditingExerciseId(null);
    }
    setShowAddForm(!showAddForm);
  };

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
              onClick={handleAddExercise}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-2 self-start"
            >
              <span>{showAddForm ? "Cancel" : "+ Add Exercise"}</span>
            </button>
          </div>

          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setFilterCategory(category.name);
                  }}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    filterCategory === category.name
                      ? "bg-purple-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>


          {showAddForm && (
            <FormAdd
              newExercise={newExercise}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              categories={categories}
              isEditing={isEditing}
            />
          )}

          {exercises.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredExercises.map(({ id, nombre, visibilidad, category }) => {
                return (
                  <CardExercises
                    key={id}
                    id={id}
                    name={nombre}
                    visibility={visibilidad}
                    category={category}
                    user={user}
                    onDelete={handleExerciseDeleted}
                    handleAddExercise={handleAddExercise}
                    onEdit={handleEditExercise}
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
