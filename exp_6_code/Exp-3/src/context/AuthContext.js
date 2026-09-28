import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Default registered users database
  const [registeredUsers, setRegisteredUsers] = useState([
    {
      email: 'viewer@guard.com',
      password: 'password123',
      role: 'viewer',
      permissions: ['read'],
    },
    {
      email: 'editor@guard.com',
      password: 'password123',
      role: 'editor',
      permissions: ['read', 'write'],
    },
    {
      email: 'admin@guard.com',
      password: 'password123',
      role: 'admin',
      permissions: ['read', 'write', 'purge'],
    },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem('rbac_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Role-based Direct Login (Fixes "login is not a function")
  const login = (role) => {
    const sessionUser = {
      email: `${role}@guard.com`,
      role: role,
      permissions:
        role === 'admin'
          ? ['read', 'write', 'purge']
          : role === 'editor'
          ? ['read', 'write']
          : ['read'],
      token: `mock-jwt-token-${Date.now()}`,
    };
    setUser(sessionUser);
    localStorage.setItem('rbac_user', JSON.stringify(sessionUser));
  };

  // Credential Verification Function
  const authenticateUser = (email, password) => {
    const foundUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const sessionUser = {
        email: foundUser.email,
        role: foundUser.role,
        permissions: foundUser.permissions,
        token: `mock-jwt-token-${Date.now()}`,
      };
      setUser(sessionUser);
      localStorage.setItem('rbac_user', JSON.stringify(sessionUser));
      return { success: true };
    }

    return { success: false, message: 'Invalid email or password.' };
  };

  // Register New User Function
  const registerUser = (email, password, role) => {
    const existingUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      email: email.toLowerCase(),
      password,
      role,
      permissions:
        role === 'admin'
          ? ['read', 'write', 'purge']
          : role === 'editor'
          ? ['read', 'write']
          : ['read'],
    };

    setRegisteredUsers([...registeredUsers, newUser]);

    const sessionUser = {
      email: newUser.email,
      role: newUser.role,
      permissions: newUser.permissions,
      token: `mock-jwt-token-${Date.now()}`,
    };

    setUser(sessionUser);
    localStorage.setItem('rbac_user', JSON.stringify(sessionUser));
    return { success: true };
  };

  // Check Authorization Permissions
  const isAuthorized = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('rbac_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        authenticateUser,
        registerUser,
        isAuthorized,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};