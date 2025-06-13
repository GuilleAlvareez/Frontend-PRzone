import { useState, useEffect } from 'react';

export function FormAdd({ onSubmit, initialData, isEditing, categories }) {
  const defaultFormState = {
    name: '',
    description: '',
    category: [],
  };

  const [formData, setFormData] = useState(defaultFormState);

  useEffect(() => {
    // Si estamos en modo edición Y tenemos datos iniciales, llenamos el formulario.
    if (isEditing && initialData) {
      setFormData({
        name: initialData.nombre || '', // Rellena con el nombre del ejercicio a editar
        description: initialData.description || '', // Rellena con la descripción del ejercicio a editar
        // Mapeamos las categorías para asegurarnos de que solo tenemos los IDs
        category: initialData.category?.map(cat => cat.id) || [],
      });
    } else {
      // Si NO estamos en modo edición (o no hay datos), reseteamos el formulario.
      setFormData(defaultFormState);
    }
  }, [initialData, isEditing]);

  const handleInputChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "category") {
      const selectedCategoryIds = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => parseInt(opt.value, 10));
      setFormData((prev) => ({ ...prev, category: selectedCategoryIds }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
        {isEditing ? "Edit Exercise" : "Add New Exercise"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
            Exercise Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name} 
            onChange={handleInputChange} 
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300 resize-vertical"
            placeholder="Enter exercise description..."
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
            Category
          </label>
          <select
            id="category"
            name="category"
            multiple
            value={formData.category.map(String)}
            onChange={handleInputChange} 
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
          >
            
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">
            Hold Ctrl (or Cmd) to select multiple categories
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            {isEditing ? "Update Exercise" : "Add Exercise"}
          </button>
        </div>
      </form>
    </div>
  );
}