import { createContext, useContext, useMemo, useState } from 'react';
import { loginUser, registerUser } from '../services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('smartMoneyUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function login(credentials) {
    const authenticatedUser = await loginUser(credentials);
    setUser(authenticatedUser);
    localStorage.setItem('smartMoneyUser', JSON.stringify(authenticatedUser));
  }

  async function register(account) {
    const registeredUser = await registerUser(account);
    setUser(registeredUser);
    localStorage.setItem('smartMoneyUser', JSON.stringify(registeredUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('smartMoneyUser');
  }

  const value = useMemo(() => ({ user, login, register, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
