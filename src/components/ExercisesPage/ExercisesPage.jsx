import { useContext, useState, useMemo } from "react";
import { SidebarContext } from "../../context/SideBarContext";
import { NavBar } from "../Dashboard/NavBar";
import { Header } from "../Dashboard/Header";
import { CardExercises } from "./CardExercises";
import { FormAdd } from "./FormAdd";
import { ExercisesDetails } from "./ExercisesDetails";
import { useAuth } from "../../hooks/useAuth";
import { useExercises } from "../../hooks/useExercises";

export function ExercisesPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const {
    exercises,
    isLoading: areExercisesLoading,
    error: exercisesError,
    selectedExerciseDetails,
    addExercise,
    removeExercise,
    updateExistingExercise,
    fetchExerciseDetails,
    clearExerciseDetails,
  } = useExercises(user?.displayUsername, user?.id);

  const { sideBarOpen } = useContext(SidebarContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(12);

  const handleToggleForm = () => {
    if (showAddForm) {
      setIsEditing(false);
      setEditingExercise(null);
    }
    setShowAddForm(!showAddForm);
  };

  const handleEditClick = (exerciseToEdit) => {
    setEditingExercise(exerciseToEdit);
    setIsEditing(true);
    setShowAddForm(true);
  };

  const handleSubmitForm = async (formData) => {
    try {
      if (isEditing) {
        await updateExistingExercise(editingExercise.id, formData);
      } else {
        await addExercise(formData);
      }
      setShowAddForm(false);
      setIsEditing(false);
      setEditingExercise(null);
    } catch (error) {
      console.error("Failed to save exercise:", error);
      alert(`Error al guardar el ejercicio: ${error.message}`);
    }
  };

  const handleDeleteClick = async (exerciseId) => {
    if (window.confirm("Are you sure you want to delete this exercise?")) {
      try {
        await removeExercise(exerciseId);
      } catch (error) {
        console.error("Failed to delete exercise:", error);
        alert(`Error al borrar el ejercicio: ${error.message}`);
      }
    }
  };

  const handleViewDetailsClick = async (exerciseId) => {
    await fetchExerciseDetails(exerciseId);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    clearExerciseDetails();
  };

  const filteredExercises = useMemo(() => {
    if (filterCategory === "All") return exercises;
    return exercises.filter(exercise => 
      exercise.category?.some(cat => (cat.nombre || cat.name) === filterCategory)
    );
  }, [exercises, filterCategory]);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const categories = [
    { id: 0, name: "All" }, { id: 1, name: "Chest" }, { id: 2, name: "Back" },
    { id: 3, name: "Legs" }, { id: 4, name: "Arms" }, { id: 5, name: "Shoulders" },
    { id: 6, name: "Other" },
  ];

  if (isAuthLoading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="w-screen h-screen flex bg-white dark:bg-gray-900">
      <NavBar />
      <div className={`flex flex-col flex-1 h-full transition-all duration-300 ${sideBarOpen ? "ml-64" : "ml-0"}`}>
        <Header />
        <div className="flex-1 p-5 overflow-auto bg-gray-50 dark:bg-slate-900">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Exercises Library</h1>
              <p className="text-gray-500 dark:text-gray-400">Manage and track your exercise collection</p>
            </div>
            <button onClick={handleToggleForm} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              <span>{showAddForm ? "Cancel" : "+ Add Exercise"}</span>
            </button>
          </div>

          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => { setFilterCategory(category.name); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-300 ${
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
              onSubmit={handleSubmitForm}
              initialData={editingExercise}
              isEditing={isEditing}
              categories={categories.filter(c => c.id !== 0)}
            />
          )}

          {areExercisesLoading && <div className="text-center p-4">Cargando ejercicios...</div>}
          {exercisesError && <div className="text-center p-4 text-red-500">Error: {exercisesError.message}</div>}

          {!areExercisesLoading && !exercisesError && (
            <>
              {currentExercises.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {currentExercises.map((exercise) => (
                    <CardExercises
                      key={exercise.id}
                      id={exercise.id}
                      name={exercise.nombre}
                      visibility={exercise.visibilidad}
                      category={exercise.category}
                      user={user}
                      onDelete={() => handleDeleteClick(exercise.id)}
                      onEdit={() => handleEditClick(exercise)}
                      onViewDetails={() => handleViewDetailsClick(exercise.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">No exercises found in this category.</p>
                </div>
              )}
              
              {filteredExercises.length > exercisesPerPage && (
                 <div className="flex justify-center items-center mt-8 space-x-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Prev
                    </button>
                    {Array.from({ length: Math.ceil(filteredExercises.length / exercisesPerPage) }, (_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 text-sm font-medium border rounded-md transition-colors duration-200 ${
                          currentPage === index + 1
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === Math.ceil(filteredExercises.length / exercisesPerPage)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Next
                    </button>
                  </div>
              )}
            </>
          )}

          {isDetailsModalOpen && (
            <>
              <div 
                className="fixed inset-0 bg-black/65 z-40"
                onClick={handleCloseDetailsModal}
              />
              <ExercisesDetails 
                title={selectedExerciseDetails?.nombre}
                description={selectedExerciseDetails?.descripcion || "No description provided for this exercise."}
                onClose={handleCloseDetailsModal}
                isLoading={areExercisesLoading}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}