// src/services/maintenanceService.js
import api from './api';

export const maintenanceService = {
  getAllMaintenance: async () => {
    try {
      const response = await api.get('/maintenance');
      return response;
    } catch (error) {
      console.error('Error fetching maintenance records:', error);
      
      // Fallback to localStorage if API fails
      try {
        const localMaintenance = JSON.parse(localStorage.getItem('maintenanceRecords') || '[]');
        return { data: localMaintenance };
      } catch (e) {
        console.error('Error reading from localStorage:', e);
        return { data: [] };
      }
    }
  },

  createMaintenance: async (maintenanceData) => {
    try {
      const response = await api.post('/maintenance', maintenanceData);
      
      // Also store in localStorage for fallback
      try {
        const records = JSON.parse(localStorage.getItem('maintenanceRecords') || '[]');
        const newRecord = {
          ...response.data,
          maintenanceId: response.data.maintenanceId || Date.now(),
          createdAt: new Date().toISOString()
        };
        records.push(newRecord);
        localStorage.setItem('maintenanceRecords', JSON.stringify(records));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
      
      return response;
    } catch (error) {
      console.error('Error creating maintenance record:', error);
      
      // Frontend fallback
      const newRecord = {
        ...maintenanceData,
        maintenanceId: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      try {
        const records = JSON.parse(localStorage.getItem('maintenanceRecords') || '[]');
        records.push(newRecord);
        localStorage.setItem('maintenanceRecords', JSON.stringify(records));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
      
      return { data: newRecord };
    }
  },

  getMaintenanceById: async (id) => {
    try {
      const response = await api.get(`/maintenance/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching maintenance record:', error);
      throw error;
    }
  },

  updateMaintenance: async (id, maintenanceData) => {
    try {
      const response = await api.put(`/maintenance/${id}`, maintenanceData);
      return response;
    } catch (error) {
      console.error('Error updating maintenance record:', error);
      throw error;
    }
  },

  deleteMaintenance: async (id) => {
    try {
      const response = await api.delete(`/maintenance/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting maintenance record:', error);
      throw error;
    }
  }
};