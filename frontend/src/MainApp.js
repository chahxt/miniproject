import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom'; // Routing
import Homepage from './pages/Homepage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';  // Import LoginPage component
import './App.css'; // Your custom styles

function MainApp() {
  const [user, setUser] = useState(null); // Optional user state (check for logged-in user)

  const navigate = useNavigate();

  // Handle login (you can set user data here after successful login)
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/dashboard');
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Check if the user is logged in
  const loggedInUser = user || JSON.parse(localStorage.getItem('user'));

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-200">Home</Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-gray-200">Register</Link>
          </li>
          {loggedInUser && (
            <li>
              <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
            </li>
          )}
          {loggedInUser ? (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="hover:text-gray-200">Login</Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} /> {/* Add route for LoginPage */}
        </Routes>
      </div>
    </div>
  );
}

export default MainApp;
