import React, { createContext, useState, useContext, useEffect } from 'react';
import { userPool } from '../aws-config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null); // Add userId state

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    setIsLoading(true);
    const user = userPool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (err) {
          setIsAuthenticated(false);
        } else if (session.isValid()) {
          setIsAuthenticated(true);
          setUserId(user.getUsername()); // Set userId
        } else {
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      });
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, userId, login, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
