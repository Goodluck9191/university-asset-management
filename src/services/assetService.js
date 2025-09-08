// src/services/assetService.js
import api from './api';

export const assetService = {
  getAllAssets: async () => {
    try {
      const response = await api.get('/assets');
      return response;
    } catch (error) {
      console.error('Error fetching assets:', error);
      throw error;
    }
  },

  getAssetById: async (id) => {
    try {
      const response = await api.get(`/assets/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching asset:', error);
      throw error;
    }
  },

  createAsset: async (assetData) => {
    try {
      // Ensure the data matches your Spring Boot entity structure
      const formattedData = {
        name: assetData.name,
        description: assetData.description,
        location: assetData.location // This should be a Location object with locationId
      };
      
      const response = await api.post('/assets', formattedData);
      return response;
    } catch (error) {
      console.error('Error creating asset:', error);
      throw error;
    }
  },

  updateAsset: async (id, assetData) => {
    try {
      const formattedData = {
        name: assetData.name,
        description: assetData.description,
        location: assetData.location
      };
      
      const response = await api.put(`/assets/${id}`, formattedData);
      return response;
    } catch (error) {
      console.error('Error updating asset:', error);
      throw error;
    }
  },

  deleteAsset: async (id) => {
    try {
      const response = await api.delete(`/assets/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting asset:', error);
      throw error;
    }
  }
};