



// import React from 'react';
// import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import './Homepage.css';

// const navLinks = [
//   { href: '/app', label: 'Home' },
//   { href: '/app/dashboard', label: 'Dashboard' },
//   { href: '/app/users', label: 'Users' },
//   { href: '/app/settings', label: 'Settings' },
//   { href: '/app/semantic-gap', label: 'Semantic Gap Analyzer' }, // Already present
//   { href: '/app/serp-features', label: 'SERP Features' } // NEW FEATURE
// ];

// export default function SidebarLayout() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('access_token');
//     navigate('/');
//   };

//   return (
//     <div className="homepage-container">
//       <nav className="sidebar-nav">
//         <div className="nav-title">SEO NAV</div>
//         {navLinks.map(link => (
//           <NavLink
//             key={link.href}
//             to={link.href}
//             className={({ isActive }) => isActive ? "active" : ""}
//             end={link.href === '/app'}
//           >
//             {link.label}
//           </NavLink>
//         ))}
//         <button
//           className="sidebar-logout-btn"
//           onClick={handleLogout}
//           style={{
//             marginTop: 'auto',
//             marginBottom: '20px',
//             width: '85%',
//             padding: '13px 0',
//             borderRadius: '10px',
//             fontWeight: 'bold',
//             border: 'none',
//             background: 'linear-gradient(90deg, #f65667, #fe9c6e)',
//             color: '#fff',
//             cursor: 'pointer',
//             boxShadow: '0 0 12px #f65667aa'
//           }}
//         >
//           Logout
//         </button>
//       </nav>
//       <main className="main-content">
//         <Outlet />
//       </main>
//     </div>
//   );
// }


import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './Homepage.css';

const navLinks = [
  { href: '/app', label: 'Home' },
  { href: '/app/dashboard', label: 'Dashboard' },
  { href: '/app/users', label: 'Users' },
  { href: '/app/settings', label: 'Settings' },
  { href: '/app/semantic-gap', label: 'Semantic Gap Analyzer' },
  { href: '/app/serp-features', label: 'SERP Features' },
  { href: '/app/security-check', label: 'Security Health Check' } // << NEW
];

export default function SidebarLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  return (
    <div className="homepage-container">
      <nav className="sidebar-nav">
        <div className="nav-title">SEO NAV</div>
        {navLinks.map(link => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) => isActive ? "active" : ""}
            end={link.href === '/app'}
          >
            {link.label}
          </NavLink>
        ))}
        <button
          className="sidebar-logout-btn"
          onClick={handleLogout}
          style={{
            marginTop: 'auto',
            marginBottom: '20px',
            width: '85%',
            padding: '13px 0',
            borderRadius: '10px',
            fontWeight: 'bold',
            border: 'none',
            background: 'linear-gradient(90deg, #f65667, #fe9c6e)',
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 0 12px #f65667aa'
          }}
        >
          Logout
        </button>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
