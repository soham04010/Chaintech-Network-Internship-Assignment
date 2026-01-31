import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/home');
    } else {
      alert("Invalid Credentials! Please check email or password.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow-sm" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="btn btn-primary w-100">Login</button>
          </form>
          <div className="text-center mt-3">
            <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;