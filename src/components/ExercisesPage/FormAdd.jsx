export function FormAdd({ newExercise, handleInputChange, handleSubmit, categories}) {

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Exercise</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4"
      >
        <div>
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
            Muscles Worked
          </label>
          <select
            multiple
            id="category"
            name="category"
            onChange={handleInputChange}
            value={newExercise.category.map(String)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
          >
            {categories
              .filter(c => c.id !== 0) // Filtrar "All" que tiene id 0
              .map((categoryObj) => (
                <option key={categoryObj.id} value={categoryObj.id}>
                  {categoryObj.name}
                </option>
              ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Select all muscles that are worked by this exercise</p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Save Exercise
          </button>
        </div>
      </form>
    </div>
  );
}
