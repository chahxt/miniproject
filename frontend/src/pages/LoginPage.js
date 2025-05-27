// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // Import Link for routing
// import '../LoginPage.css';  // Import the CSS file

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     console.log('Login attempt:', { email, password });
//     // Implement login logic with your backend
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white p-6 relative overflow-hidden">
//       {/* Decorative SVG blobs */}
//       <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700 opacity-10 rounded-full blur-3xl animate-ping" />

//       <div className="max-w-sm mx-auto z-10 relative">
//         <div className="text-center mb-10">
//           <h2 className="text-3xl font-extrabold text-purple-400 drop-shadow-lg">Login</h2>
//           <p className="mt-2 text-lg text-purple-200">Enter your credentials</p>
//         </div>

//         <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-purple-400/30">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 mb-4 rounded bg-black bg-opacity-40 border border-purple-400 text-white placeholder-purple-300"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 mb-4 rounded bg-black bg-opacity-40 border border-purple-400 text-white placeholder-purple-300"
//           />
//           <button
//             onClick={handleLogin}
//             className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
//           >
//             Login
//           </button>
          
//           {/* Forgot Password Link */}
//           <div className="text-center mt-4">
//             <Link
//               to="/forgot-password" // This can be linked to a new ForgotPasswordPage route
//               className="text-purple-300 hover:text-purple-500 text-sm"
//             >
//               Forgot Password?
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

// -----------------------------------------------------
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Import Link for routing and useNavigate for redirection
// import axios from 'axios'; // Import axios for making API requests
// import '../LoginPage.css'; // Import the CSS file

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate(); // Hook for navigation

//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent default form submission

//     try {
//       // Send login request to the backend
//       const response = await axios.post('http://localhost:5000/login', { email, password });
      
//       // Extract JWT token from the response
//       const { access_token } = response.data;
      
//       // Store the JWT token in localStorage (for session persistence)
//       localStorage.setItem('access_token', access_token);
      
//       // Show success message (can be customized based on your requirements)
//       alert('Login successful!');
      
//       // Redirect user to the protected dashboard or home page
//       navigate('/dashboard'); // Change '/dashboard' to the page you'd like to redirect after login
//     } catch (error) {
//       // Handle errors (e.g., invalid credentials)
//       alert('Login failed: ' + error.response?.data?.error || 'Unknown error');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white p-6 relative overflow-hidden">
//       {/* Decorative SVG blobs */}
//       <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700 opacity-10 rounded-full blur-3xl animate-ping" />

//       <div className="max-w-sm mx-auto z-10 relative">
//         <div className="text-center mb-10">
//           <h2 className="text-3xl font-extrabold text-purple-400 drop-shadow-lg">Login</h2>
//           <p className="mt-2 text-lg text-purple-200">Enter your credentials</p>
//         </div>

//         <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-purple-400/30">
//           {/* Email Input */}
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 mb-4 rounded bg-black bg-opacity-40 border border-purple-400 text-white placeholder-purple-300"
//             required
//           />

//           {/* Password Input */}
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 mb-4 rounded bg-black bg-opacity-40 border border-purple-400 text-white placeholder-purple-300"
//             required
//           />

//           {/* Login Button */}
//           <button
//             onClick={handleLogin}
//             className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
//           >
//             Login
//           </button>
          
//           {/* Forgot Password Link */}
//           <div className="text-center mt-4">
//             <Link
//               to="/forgot-password" // This can be linked to a new ForgotPasswordPage route
//               className="text-purple-300 hover:text-purple-500 text-sm"
//             >
//               Forgot Password?
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;
// =========================================================


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      alert('Login successful!');
      navigate('/app'); // Go to homepage/dashboard with sidebar after login
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white p-6 relative overflow-hidden">
      {/* Decorative SVG blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700 opacity-10 rounded-full blur-3xl animate-ping" />

      <div className="max-w-sm mx-auto z-10 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-purple-400 drop-shadow-lg">Login</h2>
          <p className="mt-2 text-lg text-purple-200">Enter your email and password</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-purple-400/30"
        >
          {/* Email Input */}
          <label className="block text-purple-300 mb-2 text-left" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 rounded bg-black bg-opacity-40 border border-purple-400 text-white placeholder-purple-300"
            required
          />

          {/* Password Input */}
          <label className="block text-purple-300 mb-2 text-left" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 rounded bg-black bg-opacity-40 border border-purple-400 text-white placeholder-purple-300"
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
          >
            Login
          </button>
          
          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-purple-300 hover:text-purple-500 text-sm"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
