import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const token = localStorage.getItem('token');
  
  // Nếu có token, điều hướng đến trang profile, nếu không, cho phép truy cập vào các route con
  return token ? <Navigate to="/profile" /> : <Outlet />;
};

export default PublicRoute;
