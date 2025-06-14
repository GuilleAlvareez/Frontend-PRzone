import apiClient from './apiClient';

export const authService = {
  login: async (credentials) => {
    return apiClient('/login', { body: credentials, method: 'POST' });
  },
  
  register: async (userData) => {
    return apiClient('/register', { body: userData, method: 'POST' });
  },

  logout: async () => {
    return apiClient('/logout', { method: 'POST' });
  },

  getCurrentUser: async () => {
    return apiClient('/api/me');
  },
};