import React, { createContext, useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statusCode } from '../utils/statusFile.mjs';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { status, userData } = useSelector(state => state.user)

  const login = (userData) => {
    setUser(userData)
  };
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
