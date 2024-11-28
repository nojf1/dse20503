import React, { createContext, useState, useEffect } from 'react';
import { getUserRole, getUserIdFromToken } from '../services/authUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const role = getUserRole();
    const id = getUserIdFromToken();
    setUserRole(role);
    setUserId(id);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const role = getUserRole();
    const id = getUserIdFromToken();
    setUserRole(role);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUserRole(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};