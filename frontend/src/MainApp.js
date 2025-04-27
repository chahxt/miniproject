// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// src/App.js

// src/MainApp.js

// src/MainApp.js

// src/MainApp.js
import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';  // Routing for multiple pages
import Homepage from './pages/Homepage';  // Homepage component
import RegisterPage from './pages/RegisterPage';  // Register page component
import DashboardPage from './pages/DashboardPage';  // DashboardPage component
import './App.css';  // Import your own styling (if needed)

function MainApp() {
  const [user, setUser] = useState(null);  // State for user (optional)

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
          <li>
            <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
          </li>
        </ul>
      </nav>

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Homepage />} />  {/* Home page route */}
          <Route path="/register" element={<RegisterPage />} />  {/* Register page route */}
          <Route path="/dashboard" element={<DashboardPage />} />  {/* Dashboard page route */}
        </Routes>
      </div>
    </div>
  );
}

export default MainApp;
