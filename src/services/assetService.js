// src/services/assetService.js
import api from './api';

export const assetService = {
  getAllAssets: () => api.get('/assets'),
  getAssetById: (id) => api.get(`/assets/${id}`),
  createAsset: (assetData) => api.post('/assets', assetData),
  updateAsset: (id, assetData) => api.put(`/assets/${id}`, assetData),
  deleteAsset: (id) => api.delete(`/assets/${id}`),
};