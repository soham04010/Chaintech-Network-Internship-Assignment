import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* Redirect to home if already logged in */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />
          
          {/* Protected Route: Redirect to login if not logged in */}
          <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
          
          {/* Default catch-all */}
          <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;