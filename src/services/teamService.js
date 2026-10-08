import api from './api';

// /team endpoints. Each function returns the record(s) from the API's "data" field.
export const getAll = async () => (await api.get('/team')).data;
export const getById = async (id) => (await api.get(`/team/${id}`)).data;
export const create = async (payload) => (await api.post('/team', payload)).data;
export const update = async (id, payload) => (await api.put(`/team/${id}`, payload)).data;
export const remove = async (id) => api.delete(`/team/${id}`);
