import api from './api';

// /assets endpoints. Each function returns the record(s) from the API's "data" field.
export const getAll = async () => (await api.get('/assets')).data;
export const getById = async (id) => (await api.get(`/assets/${id}`)).data;
export const create = async (payload) => (await api.post('/assets', payload)).data;
export const update = async (id, payload) => (await api.put(`/assets/${id}`, payload)).data;
export const remove = async (id) => api.delete(`/assets/${id}`);
