import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match!");
    
    signup({ name: formData.name, email: formData.email, password: formData.password });
    alert("Registration Successful! Please login.");
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow-sm" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Register</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Name</label>
              <input type="text" name="name" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" name="email" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" name="password" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} required />
            </div>
            <button className="btn btn-primary w-100">Sign Up</button>
          </form>
          <div className="text-center mt-3">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;