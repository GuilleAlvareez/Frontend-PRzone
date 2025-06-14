import apiClient from './apiClient';

export const chatService = {
  sendMessage: async (payload) => {
    return apiClient('/chat', { body: payload, method: 'POST' });
  },

  getChatHistory: async (userId) => {
    if (!userId) {
      console.warn('getChatHistory: userId is required');
      return Promise.resolve([]);
    }
    return apiClient(`/chat/history/${userId}`);
  },
  
  deleteChatHistory: async (userId) => {
    if (!userId) {
      console.warn('deleteChatHistory: userId is required');
      return Promise.reject({ message: 'User ID is required to delete chat history.' });
    }
    return apiClient(`/chat/history/${userId}`, { method: 'DELETE' });
  },
};