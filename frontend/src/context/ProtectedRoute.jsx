import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();

  if (!userRole) {
    // If not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (userRole !== requiredRole) {
    // If user doesn't have the required role, redirect to dashboard
    return <Navigate to={userRole === 'admin' ? '/admin_dashboard' : '/dashboard'} />;
  }

  // If user has the required role, allow access to the component
  return children;
};

export default ProtectedRoute;