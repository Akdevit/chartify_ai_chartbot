// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const PrivateRoute = () => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
