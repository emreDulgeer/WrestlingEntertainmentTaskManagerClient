import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { auth, isAuthLoaded } = useAuth();

  console.log('ProtectedRoute: auth.isAuthenticated:', auth.isAuthenticated);
  console.log('ProtectedRoute: auth.user:', auth.user);
  console.log('ProtectedRoute: isAuthLoaded:', isAuthLoaded);

  if (!isAuthLoaded) {
    console.log('ProtectedRoute: Auth is still loading.');
    return <p>Loading...</p>;
  }

  if (!auth.isAuthenticated || !auth.token || !auth.user) {
    console.error('ProtectedRoute: Unauthorized access. Redirecting to login.');
    return <Navigate to="/" />;
  }

  if (role) {
    const userRole = auth.user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    const isAuthorized = Array.isArray(role) ? role.includes(userRole) : userRole === role;

    console.log('ProtectedRoute: Checking role authorization.');
    console.log('ProtectedRoute: User role:', userRole);
    console.log('ProtectedRoute: Allowed roles:', role);

    if (!isAuthorized) {
      console.error('ProtectedRoute: User not authorized for this route. Redirecting to unauthorized page.');
      return <Navigate to="/unauthorized" />;
    }
  }

  console.log('ProtectedRoute: User authorized. Rendering children.');
  return children;
};

export default ProtectedRoute;
