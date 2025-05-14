export function FormAdd({ newExercise, handleInputChange, handleSubmit, categories}) {

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Exercise</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="md:col-span-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Exercise Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newExercise.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            multiple
            id="category"
            name="category"
            onChange={handleInputChange}
            // value del select múltiple espera un array de strings
            value={newExercise.category.map(String)} // Convertir IDs numéricos a strings para el select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categories // Usar la nueva prop
              // .filter((c) => c.name !== "All") // "All" no es una categoría para asignar a un ejercicio
              .map((categoryObj) => (
                <option key={categoryObj.id} value={categoryObj.id}> {/* value es el ID */}
                  {categoryObj.name} {/* Se muestra el nombre */}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="visibility"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Visibility
          </label>
          <select
            id="visibility"
            name="visibility"
            value={newExercise.visibility}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            onClick={handleSubmit}
          >
            Save Exercise
          </button>
        </div>
      </form>
    </div>
  );
}
