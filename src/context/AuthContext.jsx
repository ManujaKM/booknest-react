import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('adminUser');
    return stored
      ? JSON.parse(stored)
      : {
          name: 'Admin User',
          email: 'admin@booknest.com',
          role: 'Super Admin'
        };
  });

  const isAuthenticated = useMemo(() => Boolean(admin), [admin]);

  const login = (nextAdmin, token = 'demo-admin-token') => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(nextAdmin));
    setAdmin(nextAdmin);
    navigate('/admin/dashboard');
  };

  const updateAdmin = (nextAdmin) => {
    localStorage.setItem('adminUser', JSON.stringify(nextAdmin));
    setAdmin(nextAdmin);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdmin(null);
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated, login, logout, updateAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
