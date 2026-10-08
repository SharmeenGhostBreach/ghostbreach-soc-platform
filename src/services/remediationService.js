import api from './api';

// /remediation endpoints. Each function returns the record(s) from the API's "data" field.
export const getAll = async () => (await api.get('/remediation')).data;
export const getById = async (id) => (await api.get(`/remediation/${id}`)).data;
export const create = async (payload) => (await api.post('/remediation', payload)).data;
export const update = async (id, payload) => (await api.put(`/remediation/${id}`, payload)).data;
export const remove = async (id) => api.delete(`/remediation/${id}`);
