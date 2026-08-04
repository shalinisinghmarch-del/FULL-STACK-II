import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    const savedToken = localStorage.getItem('token');
    if (savedToken && savedRole) {
      setUser({ token: savedToken, role: savedRole });
    }
  }, []);

  const login = (role) => {
    const mockToken = `jwt-token-${Math.random().toString(36).substring(7)}`;
    localStorage.setItem('token', mockToken);
    localStorage.setItem('role', role);
    setUser({ token: mockToken, role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};