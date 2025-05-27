// import React, { useState } from 'react';
// import './UserSettings.css';

// export default function SettingsPage() {
//   const [darkMode, setDarkMode] = useState(true);
//   const [notifications, setNotifications] = useState(true);
//   const [pwd, setPwd] = useState('');
//   const [msg, setMsg] = useState('');

//   // Dummy password change handler
//   const handlePwdChange = (e) => {
//     e.preventDefault();
//     setMsg('Password changed! (Simulation)');
//     setPwd('');
//     setTimeout(() => setMsg(''), 2000);
//   };

//   return (
//     <div className="settings-page">
//       <h2 className="settings-title">⚙️ Settings</h2>
//       <div className="settings-section">
//         <h3>Appearance</h3>
//         <label className="settings-switch">
//           <input
//             type="checkbox"
//             checked={darkMode}
//             onChange={() => setDarkMode(d => !d)}
//             disabled // toggle does nothing in demo
//           />
//           <span className="slider"></span>
//           Dark Mode
//         </label>
//       </div>
//       <div className="settings-section">
//         <h3>Notifications</h3>
//         <label className="settings-switch">
//           <input
//             type="checkbox"
//             checked={notifications}
//             onChange={() => setNotifications(n => !n)}
//           />
//           <span className="slider"></span>
//           Enable Email Notifications
//         </label>
//       </div>
//       <div className="settings-section">
//         <h3>Change Password</h3>
//         <form onSubmit={handlePwdChange} className="settings-form">
//           <input
//             type="password"
//             value={pwd}
//             onChange={e => setPwd(e.target.value)}
//             placeholder="New Password"
//             minLength={4}
//             className="settings-input"
//             required
//           />
//           <button type="submit" className="settings-btn">Change Password</button>
//         </form>
//         {msg && <div className="settings-msg">{msg}</div>}
//       </div>
//       <div className="settings-section">
//         <h3>Account</h3>
//         <button className="settings-btn danger" disabled>Delete Account</button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import './UserSettings.css';

export default function SettingsPage() {
  // Read dark mode from localStorage or default to true
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'false' ? false : true;
  });
  const [notifications, setNotifications] = useState(true);
  const [pwd, setPwd] = useState('');
  const [msg, setMsg] = useState('');

  // Apply/remove dark mode class on body
  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // Dummy password change handler
  const handlePwdChange = (e) => {
    e.preventDefault();
    setMsg('Password changed! (Simulation)');
    setPwd('');
    setTimeout(() => setMsg(''), 2000);
  };

  // "Delete Account" removes user from localStorage and reloads page (demo only)
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure? This will log you out (demo only).")) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  };

  return (
    <div className="settings-page">
      <h2 className="settings-title">⚙️ Settings</h2>
      <div className="settings-section">
        <h3>Appearance</h3>
        <label className="settings-switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(d => !d)}
          />
          <span className="slider"></span>
          Dark Mode
        </label>
      </div>
      <div className="settings-section">
        <h3>Notifications</h3>
        <label className="settings-switch">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(n => !n)}
          />
          <span className="slider"></span>
          Enable Email Notifications
        </label>
      </div>
      <div className="settings-section">
        <h3>Change Password</h3>
        <form onSubmit={handlePwdChange} className="settings-form">
          <input
            type="password"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            placeholder="New Password"
            minLength={4}
            className="settings-input"
            required
          />
          <button type="submit" className="settings-btn">Change Password</button>
        </form>
        {msg && <div className="settings-msg">{msg}</div>}
      </div>
      <div className="settings-section">
        <h3>Account</h3>
        <button className="settings-btn danger" onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
  );
}
