// src/services/assignmentService.js
import api from './api';

export const assignmentService = {
  getAllAssignments: () => api.get('/assignments'),
  getAssignmentById: (id) => api.get(`/assignments/${id}`),
  createAssignment: (assignmentData) => api.post('/assignments', assignmentData),
  updateAssignment: (id, assignmentData) => api.put(`/assignments/${id}`, assignmentData),
  deleteAssignment: (id) => api.delete(`/assignments/${id}`),
};