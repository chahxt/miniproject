

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../RegisterPage.css'; // Import the CSS file

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { email, password });
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert('Registration failed: ' + error.response.data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white p-6 relative overflow-hidden">
      {/* Decorative SVG blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700 opacity-10 rounded-full blur-3xl animate-ping" />

      <div className="max-w-sm mx-auto z-10 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-purple-400 drop-shadow-lg">Register</h2>
          <p className="mt-2 text-lg text-purple-200">Create your account</p>
        </div>

        <form onSubmit={handleRegister} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-purple-400/30">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 rounded bg-black bg-opacity-40 border border-purple-400 text-white placeholder-purple-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 rounded bg-black bg-opacity-40 border border-purple-400 text-white placeholder-purple-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
