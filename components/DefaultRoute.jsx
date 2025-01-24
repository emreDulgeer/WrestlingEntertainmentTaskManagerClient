import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DefaultRoute = () => {
  const { auth } = useAuth();

  console.log('DefaultRoute: auth.isAuthenticated:', auth.isAuthenticated);
  console.log('DefaultRoute: auth.user:', auth.user);

  if (!auth.isAuthenticated) {
    console.error('DefaultRoute: User not authenticated. Redirecting to login.');
    return <Navigate to="/login" />;
  }

  const role = auth.user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

  console.log('DefaultRoute: User role:', role);

  if (role === 'General Manager') {
    console.log('DefaultRoute: Redirecting to General Manager dashboard.');
    return <Navigate to="/general-manager" />;
  }
  if (role === 'Brand Manager') {
    console.log('DefaultRoute: Redirecting to Brand Manager dashboard.');
    return <Navigate to="/brand-manager" />;
  }
  if (role === 'Coach') {
    console.log('DefaultRoute: Redirecting to Brand Manager dashboard.');
    return <Navigate to="/Coach" />;
  }
  if (role === 'Writer') {
    console.log('DefaultRoute: Redirecting to Brand Manager dashboard.');
    return <Navigate to="/Writer" />;
  }
  if (role === 'Wrestler') {
    console.log('DefaultRoute: Redirecting to Brand Manager dashboard.');
    return <Navigate to="/Wrestler" />;
  }
  console.error('DefaultRoute: No matching role found. Redirecting to unauthorized page.');
  return <Navigate to="/unauthorized" />;
};

export default DefaultRoute;
