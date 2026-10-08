import api, { setToken, clearToken, getToken } from './api';

// Each function returns the user object; login/register also store the JWT.

export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  setToken(res.token);
  return res.data;
};

export const register = async (name, email, password) => {
  const res = await api.post('/auth/register', { name, email, password });
  setToken(res.token);
  return res.data;
};

// Asks the server who the token belongs to (used when the page is reloaded)
export const fetchCurrentUser = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

export const logout = () => clearToken();

export { getToken };
