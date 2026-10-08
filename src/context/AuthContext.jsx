import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // true while we verify a saved token with the server (prevents a flash of the login page)
  const [loading, setLoading] = useState(!!authService.getToken());

  // Remove data left behind by the old mock/localStorage version of the app
  useEffect(() => {
    localStorage.removeItem('ghostbreach_user');
    localStorage.removeItem('ghostbreach_soc_data');
  }, []);

  // On page load: if a token is saved, ask the API who it belongs to
  useEffect(() => {
    if (!authService.getToken()) return;
    let cancelled = false;
    authService
      .fetchCurrentUser()
      .then((me) => !cancelled && setUser(me))
      .catch(() => !cancelled && setUser(null))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  // api.js fires this event when the server rejects our token (expired / invalid)
  useEffect(() => {
    const onUnauthorized = () => setUser(null);
    window.addEventListener('ghostbreach:unauthorized', onUnauthorized);
    return () => window.removeEventListener('ghostbreach:unauthorized', onUnauthorized);
  }, []);

  const login = async (email, password) => {
    try {
      const me = await authService.login(email, password);
      setUser(me);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const me = await authService.register(name, email, password);
      setUser(me);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, setUser, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
