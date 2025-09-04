// src/services/maintenanceService.js
import api from './api';

export const maintenanceService = {
  getAllMaintenance: () => api.get('/maintenance'),
  getMaintenanceById: (id) => api.get(`/maintenance/${id}`),
  createMaintenance: (maintenanceData) => api.post('/maintenance', maintenanceData),
  updateMaintenance: (id, maintenanceData) => api.put(`/maintenance/${id}`, maintenanceData),
  deleteMaintenance: (id) => api.delete(`/maintenance/${id}`),
};