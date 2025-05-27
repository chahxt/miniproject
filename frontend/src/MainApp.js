


// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// import Homepage from './pages/Homepage';
// import RegisterPage from './pages/RegisterPage';
// import DashboardPage from './pages/DashboardPage';
// import LoginPage from './pages/LoginPage';
// import UsersPage from './pages/UsersPage';
// import SettingsPage from './pages/SettingsPage';
// import SidebarLayout from './SidebarLayout';
// import ProtectedRoutes from './ProtectedRoutes';

// // NEW: Import the Semantic Gap Analyzer Page
// import SemanticGapAnalyzerPage from './pages/SemanticGapAnalyzerPage';
// // NEW: Import the SERP Feature Assessment Page
// import SerpFeatureAssessmentPage from './pages/SerpFeatureAssessmentPage';

// export default function MainApp() {
//   return (
//     <Routes>
//       {/* Landing Page */}
//       <Route path="/" element={<LandingPage />} />

//       {/* Sidebar pages (protected inside) */}
//       <Route path="/app" element={<SidebarLayout />}>
//         <Route element={<ProtectedRoutes />}>
//           <Route index element={<Homepage />} />
//           <Route path="dashboard" element={<DashboardPage />} />
//           <Route path="users" element={<UsersPage />} />
//           <Route path="settings" element={<SettingsPage />} />

//           {/* Semantic Gap Analyzer Route */}
//           <Route path="semantic-gap" element={<SemanticGapAnalyzerPage />} />
//           {/* NEW: SERP Features Route */}
//           <Route path="serp-features" element={<SerpFeatureAssessmentPage />} />
//         </Route>
//         <Route path="login" element={<LoginPage />} />
//         <Route path="register" element={<RegisterPage />} />
//       </Route>
//     </Routes>
//   );
// }

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Homepage from './pages/Homepage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';
import SidebarLayout from './SidebarLayout';
import ProtectedRoutes from './ProtectedRoutes';

import SemanticGapAnalyzerPage from './pages/SemanticGapAnalyzerPage';
import SerpFeatureAssessmentPage from './pages/SerpFeatureAssessmentPage';
import SecurityHealthCheckPage from './pages/SecurityHealthCheckPage'; // << NEW

export default function MainApp() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Sidebar pages (protected inside) */}
      <Route path="/app" element={<SidebarLayout />}>
        <Route element={<ProtectedRoutes />}>
          <Route index element={<Homepage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="semantic-gap" element={<SemanticGapAnalyzerPage />} />
          <Route path="serp-features" element={<SerpFeatureAssessmentPage />} />
          <Route path="security-check" element={<SecurityHealthCheckPage />} /> {/* NEW */}
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
