// import React, { useState } from 'react';
// import './UserSettings.css';

// // Simulate getting the user from "auth" (real app: get from context or backend)
// function getLoggedInUser() {
//   // Example: Store user as {email: "...", username: "..."}
//   const stored = localStorage.getItem('user');
//   try {
//     return stored ? JSON.parse(stored) : { email: 'you@example.com', username: '' };
//   } catch {
//     return { email: 'you@example.com', username: '' };
//   }
// }

// export default function UsersPage() {
//   const [user, setUser] = useState(getLoggedInUser());
//   const [editing, setEditing] = useState(false);
//   const [form, setForm] = useState({
//     username: user.username || '',
//     email: user.email,
//     phone: user.phone || '',
//     bio: user.bio || '',
//   });
//   const [msg, setMsg] = useState('');

//   const handleEdit = () => setEditing(true);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     setUser({ ...user, ...form });
//     localStorage.setItem('user', JSON.stringify({ ...user, ...form }));
//     setEditing(false);
//     setMsg('Profile updated!');
//     setTimeout(() => setMsg(''), 1800);
//   };

//   return (
//     <div className="users-page">
//       <h2 className="users-title">👤 My Profile</h2>
//       <div className="profile-box">
//         {!editing ? (
//           <>
//             <div className="profile-row">
//               <div className="profile-label">Email:</div>
//               <div className="profile-value">{user.email}</div>
//             </div>
//             <div className="profile-row">
//               <div className="profile-label">Username:</div>
//               <div className="profile-value">{user.username || <span style={{color:'#f76'}}>Not set</span>}</div>
//             </div>
//             <div className="profile-row">
//               <div className="profile-label">Phone:</div>
//               <div className="profile-value">{user.phone || <span style={{color:'#f76'}}>Not set</span>}</div>
//             </div>
//             <div className="profile-row">
//               <div className="profile-label">Bio:</div>
//               <div className="profile-value">{user.bio || <span style={{color:'#f76'}}>Not set</span>}</div>
//             </div>
//             <button className="action-btn" style={{marginTop:20}} onClick={handleEdit}>
//               Edit Profile
//             </button>
//           </>
//         ) : (
//           <form onSubmit={handleSave} className="profile-form">
//             <div className="profile-row">
//               <div className="profile-label">Email:</div>
//               <input name="email" value={form.email} disabled className="profile-input" />
//             </div>
//             <div className="profile-row">
//               <div className="profile-label">Username:</div>
//               <input
//                 name="username"
//                 value={form.username}
//                 onChange={handleChange}
//                 placeholder="Enter username"
//                 className="profile-input"
//                 required
//               />
//             </div>
//             <div className="profile-row">
//               <div className="profile-label">Phone:</div>
//               <input
//                 name="phone"
//                 value={form.phone}
//                 onChange={handleChange}
//                 placeholder="Add phone number"
//                 className="profile-input"
//                 type="tel"
//                 pattern="[0-9]{10,15}"
//               />
//             </div>
//             <div className="profile-row">
//               <div className="profile-label">Bio:</div>
//               <input
//                 name="bio"
//                 value={form.bio}
//                 onChange={handleChange}
//                 placeholder="Tell us something..."
//                 className="profile-input"
//                 maxLength={70}
//               />
//             </div>
//             <div style={{display:'flex',gap:'10px',marginTop:12}}>
//               <button className="action-btn" type="submit">Save</button>
//               <button className="action-btn danger" type="button" onClick={()=>setEditing(false)}>Cancel</button>
//             </div>
//           </form>
//         )}
//         {msg && <div className="settings-msg">{msg}</div>}
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import './UserSettings.css';

// Get user info from localStorage or default
function getLoggedInUser() {
  const stored = localStorage.getItem('user');
  try {
    return stored ? JSON.parse(stored) : { email: '', username: '' };
  } catch {
    return { email: '', username: '' };
  }
}

export default function UsersPage() {
  const [user, setUser] = useState(getLoggedInUser());
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    username: user.username || '',
    email: user.email,
    phone: user.phone || '',
    bio: user.bio || '',
  });
  const [msg, setMsg] = useState('');

  const handleEdit = () => setEditing(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser({ ...user, ...form });
    localStorage.setItem('user', JSON.stringify({ ...user, ...form }));
    setEditing(false);
    setMsg('Profile updated!');
    setTimeout(() => setMsg(''), 1800);
  };

  // Check if user is logged in (i.e. has a real email)
  const isLoggedIn = !!user.email;

  return (
    <div className="users-page">
      <h2 className="users-title">👤 My Profile</h2>
      <div className="profile-box">
        {!editing ? (
          <>
            <div className="profile-row">
              <div className="profile-label">Email:</div>
              <div className="profile-value">
                {isLoggedIn
                  ? user.email
                  : <span style={{ color: '#f76' }}>Not logged in</span>}
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-label">Username:</div>
              <div className="profile-value">
                {user.username || <span style={{ color: '#f76' }}>Not set</span>}
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-label">Phone:</div>
              <div className="profile-value">
                {user.phone || <span style={{ color: '#f76' }}>Not set</span>}
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-label">Bio:</div>
              <div className="profile-value">
                {user.bio || <span style={{ color: '#f76' }}>Not set</span>}
              </div>
            </div>
            <button className="action-btn" style={{ marginTop: 20 }} onClick={handleEdit}>
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSave} className="profile-form">
            <div className="profile-row">
              <div className="profile-label">Email:</div>
              <input
                name="email"
                value={form.email}
                disabled
                className="profile-input"
              />
            </div>
            <div className="profile-row">
              <div className="profile-label">Username:</div>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="profile-input"
                required
              />
            </div>
            <div className="profile-row">
              <div className="profile-label">Phone:</div>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Add phone number"
                className="profile-input"
                type="tel"
                pattern="[0-9]{10,15}"
              />
            </div>
            <div className="profile-row">
              <div className="profile-label">Bio:</div>
              <input
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell us something..."
                className="profile-input"
                maxLength={70}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: 12 }}>
              <button className="action-btn" type="submit">Save</button>
              <button className="action-btn danger" type="button" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        )}
        {msg && <div className="settings-msg">{msg}</div>}
      </div>
    </div>
  );
}

