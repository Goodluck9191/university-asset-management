// src/services/locationService.js
import api from './api';

export const locationService = {
  getAllLocations: () => api.get('/locations'),
  getLocationById: (id) => api.get(`/locations/${id}`),
  createLocation: (locationData) => api.post('/locations', locationData),
  updateLocation: (id, locationData) => api.put(`/locations/${id}`, locationData),
  deleteLocation: (id) => api.delete(`/locations/${id}`),
};