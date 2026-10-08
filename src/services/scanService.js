import api from './api';

// /scans endpoints. Each function returns the record(s) from the API's "data" field.
export const getAll = async () => (await api.get('/scans')).data;
export const getById = async (id) => (await api.get(`/scans/${id}`)).data;
export const create = async (payload) => (await api.post('/scans', payload)).data;
export const update = async (id, payload) => (await api.put(`/scans/${id}`, payload)).data;
export const remove = async (id) => api.delete(`/scans/${id}`);
