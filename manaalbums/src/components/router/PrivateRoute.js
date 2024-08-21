import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const user = localStorage.getItem('user');
  
  return user ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
