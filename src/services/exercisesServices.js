import apiClient from './apiClient';

export const exerciseServices = {
  getExercises: async (username) => {
    if (!username) {
      console.warn('getExercises: username is required');
      return Promise.resolve({ results: [], category: 'all' });
    }
    return apiClient(`/exercises/${username}`);
  },

  createExercise: async (exerciseData) => {
    return apiClient('/exercises/new', { body: exerciseData, method: 'POST' });
  },

  updateExercise: async (exerciseId, exerciseData) => {
    return apiClient(`/exercises/update/${exerciseId}`, { body: exerciseData, method: 'PATCH' });
  },
  
  deleteExercise: async (exerciseId) => {
    return apiClient(`/exercises/delete/${exerciseId}`, { method: 'DELETE' });
  },

  getMostUsedExercises: async (userId) => {
    if (!userId) {
      console.warn('getMostUsedExercises: userId is required');
      return Promise.resolve([]);
    }
    return apiClient(`/exercises/mostused/${userId}`);
  },
  
  getExerciseProgress: async (exerciseId) => {
    if (!exerciseId) {
      console.warn('getExerciseProgress: exerciseId is required');
      return Promise.resolve([]);
    }
    return apiClient(`/exercises/progress/${exerciseId}`);
  },

  getExerciseDetails: async (exerciseId) => {
    if (!exerciseId) {
      console.warn('getExerciseDetails: exerciseId is required');
      return Promise.resolve([]);
    }
    return apiClient(`/exercises/details/${exerciseId}`);
  },
};