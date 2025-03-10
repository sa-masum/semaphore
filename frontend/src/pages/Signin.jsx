import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form Data:', formData); 
      const response = await axios.post("http://localhost:5000/api/v1/user/signin", formData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });
      console.log('Response:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('There was an error signing in!', error.response);
    }
  };

  return (
    <div className="signin-form">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Enter your email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder='Enter password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Not registered yet?{" "}
        <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Signin;