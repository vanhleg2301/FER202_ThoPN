import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  
  // Nếu có token, cho phép truy cập vào các route con, nếu không, điều hướng đến trang đăng nhập
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
