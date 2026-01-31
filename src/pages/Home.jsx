import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Get today's date in YYYY-MM-DD format to prevent future dates
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    dob: '',
    phone: '',
    gender: ''
  });

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: user.name || '',
        email: user.email || '',
        age: user.age || '',
        dob: user.dob || '',
        phone: user.phone || '',
        gender: user.gender || 'Select Gender'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    // Extra validation safety check
    if (formData.dob > today) {
      alert("Date of birth cannot be in the future!");
      return;
    }

    updateUser({
      name: formData.name,
      age: formData.age,
      dob: formData.dob,
      phone: formData.phone,
      gender: formData.gender
    });
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="container mt-5">
      <div className="jumbotron p-4 p-md-5 bg-light rounded shadow-sm text-center">
        <h1 className="display-4">Welcome, {user?.name}!</h1>
        <p className="lead">Manage your full profile details below.</p>
        <hr className="my-4" />

        <div className="card mx-auto text-start shadow" style={{ maxWidth: '700px' }}>
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Profile Information</h5>
            {!isEditing && (
              <button className="btn btn-light btn-sm" onClick={() => setIsEditing(true)}>
                Edit Details
              </button>
            )}
          </div>

          <div className="card-body">
            {!isEditing ? (
              /* --- VIEW MODE --- */
              <div className="row">
                <div className="col-md-6 mb-3">
                  <strong>Full Name:</strong> <p className="text-muted">{user?.name}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <strong>Email:</strong> <p className="text-muted">{user?.email}</p>
                </div>
                <div className="col-md-4 mb-3">
                  <strong>Age:</strong> <p className="text-muted">{user?.age || "Not set"}</p>
                </div>
                <div className="col-md-4 mb-3">
                  <strong>Date of Birth:</strong> <p className="text-muted">{user?.dob || "Not set"}</p>
                </div>
                <div className="col-md-4 mb-3">
                  <strong>Gender:</strong> <p className="text-muted">{user?.gender || "Not set"}</p>
                </div>
                <div className="col-md-12">
                  <strong>Phone Number:</strong> <p className="text-muted">{user?.phone || "Not set"}</p>
                </div>
              </div>
            ) : (
              /* --- EDIT MODE --- */
              <form onSubmit={handleUpdate}>
                <div className="row">
                  {/* Name */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      className="form-control" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>

                  {/* Email (Read Only) */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email (Cannot be changed)</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      value={formData.email} 
                      disabled 
                    />
                  </div>

                  {/* Age */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Age</label>
                    <input 
                      type="number" 
                      name="age"
                      className="form-control" 
                      value={formData.age} 
                      onChange={handleChange} 
                      placeholder="Ex: 22"
                      min="0"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input 
                      type="date" 
                      name="dob"
                      className="form-control" 
                      value={formData.dob} 
                      onChange={handleChange}
                      max={today} // This blocks future dates in the UI
                    />
                  </div>

                  {/* Gender Select */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Gender</label>
                    <select 
                      name="gender" 
                      className="form-select" 
                      value={formData.gender} 
                      onChange={handleChange}
                    >
                      <option disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Phone */}
                  <div className="col-md-12 mb-4">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      className="form-control" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-secondary me-2" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;