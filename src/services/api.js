// Reusable API helper used by every service file.
// - Base URL comes from VITE_API_URL (frontend/.env). No secrets live in the frontend.
// - Adds the JWT (if the user is logged in) as "Authorization: Bearer <token>".
// - Turns HTTP errors into readable messages (ApiError).

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
const TOKEN_KEY = 'ghostbreach_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// Error type that carries the HTTP status (0 = server could not be reached)
export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const DEFAULT_MESSAGES = {
  400: 'Invalid input. Please check the form and try again.',
  401: 'Authentication required. Please sign in.',
  403: 'Access denied. Your role does not allow this action.',
  404: 'Resource not found.',
  409: 'This record already exists.',
  500: 'Server error. Please try again later.',
};

async function request(method, path, body) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('Cannot reach the server. Make sure the backend is running (npm run dev in /backend).', 0);
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // response had no JSON body
  }

  if (!response.ok) {
    // Token rejected while logged in -> tell the app to log out
    if (response.status === 401 && token) {
      clearToken();
      window.dispatchEvent(new Event('ghostbreach:unauthorized'));
    }
    const fallback = DEFAULT_MESSAGES[response.status] || DEFAULT_MESSAGES[500];
    throw new ApiError((data && data.message) || fallback, response.status);
  }

  return data;
}

export const api = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  put: (path, body) => request('PUT', path, body),
  delete: (path) => request('DELETE', path),
};

export default api;
