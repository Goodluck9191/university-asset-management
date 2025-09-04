// src/services/authService.js
import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.get('/users');
    const users = response.data;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // In a real app, you'd get a token from the backend
      const token = btoa(`${email}:${password}`);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } else {
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};