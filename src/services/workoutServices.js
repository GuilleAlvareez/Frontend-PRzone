import apiClient from './apiClient';

export const workoutService = {
  getWorkouts: async (userId) => {
    if (!userId) {
      console.warn('getWorkouts: userId is required');
      return Promise.resolve({ results: [], category: 'all' });
    }
    return apiClient(`/workouts/${userId}`);
  },

  getRecentWorkouts: async (userId) => {
    if (!userId) {
      console.warn('getRecentWorkouts: userId is required');
      return Promise.resolve({ results: [], category: 'all' });
    }
    return apiClient(`/recentworkouts/${userId}`);
  },

  getWorkoutDetails: async (workoutId) => {
    if (!workoutId) {
      console.warn('getWorkoutDetails: workoutId is required');
      return Promise.reject({ message: 'Workout ID is required for fetching details.' });
    }
    return apiClient(`/workouts/details/${workoutId}`);
  },

  createWorkout: async (workoutData) => {
    return apiClient('/workouts/new', { body: workoutData, method: 'POST' });
  },

  deleteWorkout: async (workoutId) => {
    return apiClient(`/workouts/delete/${workoutId}`, { method: 'DELETE' });
  },

  getConsecutiveDays: async (userId) => {
    if (!userId) {
      console.warn('getConsecutiveDays: userId is required');
      return Promise.resolve({ diasConsecutivos: 0 });
    }
    return apiClient(`/dias-consecutivos/${userId}`);
  },
};