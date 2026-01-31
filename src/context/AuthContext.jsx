import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is logged in on page load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Register a new user
  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Login a user
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  // Update user profile (Requirement: Edit account info)
  const updateUser = (updatedData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Update in the main list
    const updatedUsers = users.map(u => u.email === user.email ? { ...u, ...updatedData } : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Update current session
    const currentUserData = { ...user, ...updatedData };
    localStorage.setItem('currentUser', JSON.stringify(currentUserData));
    setUser(currentUserData);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);