import api from './api';

// /reports endpoints. Each function returns the record(s) from the API's "data" field.
export const getAll = async () => (await api.get('/reports')).data;
export const getById = async (id) => (await api.get(`/reports/${id}`)).data;
export const create = async (payload) => (await api.post('/reports', payload)).data;
export const update = async (id, payload) => (await api.put(`/reports/${id}`, payload)).data;
export const remove = async (id) => api.delete(`/reports/${id}`);
