import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoute = () => {
  const user = localStorage.getItem('user');
  const location = useLocation();

  return user ? <Navigate to={location.state?.from || '/'} replace /> : <Outlet />;
};

export default PublicRoute;
