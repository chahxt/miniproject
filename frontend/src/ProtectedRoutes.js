import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoutes() {
  const isLoggedIn = !!localStorage.getItem('access_token');
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
