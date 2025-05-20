import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import '../LoginPage.css';  // Import the CSS file

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login attempt:', { email, password });
    // Implement login logic with your backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white p-6 relative overflow-hidden">
      {/* Decorative SVG blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700 opacity-10 rounded-full blur-3xl animate-ping" />

      <div className="max-w-sm mx-auto z-10 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-purple-400 drop-shadow-lg">Login</h2>
          <p className="mt-2 text-lg text-purple-200">Enter your credentials</p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-purple-400/30">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 rounded bg-black bg-opacity-40 border border-purple-400 text-white placeholder-purple-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 rounded bg-black bg-opacity-40 border border-purple-400 text-white placeholder-purple-300"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
          >
            Login
          </button>
          
          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <Link
              to="/forgot-password" // This can be linked to a new ForgotPasswordPage route
              className="text-purple-300 hover:text-purple-500 text-sm"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
