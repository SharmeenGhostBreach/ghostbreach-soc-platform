import api from './api';

// /users endpoints. Each function returns the record(s) from the API's "data" field.
export const getAll = async () => (await api.get('/users')).data;
export const getById = async (id) => (await api.get(`/users/${id}`)).data;
export const create = async (payload) => (await api.post('/users', payload)).data;
export const update = async (id, payload) => (await api.put(`/users/${id}`, payload)).data;
export const remove = async (id) => api.delete(`/users/${id}`);
