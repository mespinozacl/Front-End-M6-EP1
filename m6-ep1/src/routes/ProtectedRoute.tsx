import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children?: React.ReactNode; // Children are now optional
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" replace />;
  }

  //if (!allowedRoles.includes(user.role)) {
  if (!allowedRoles.includes(user?.role || "")) {
    // Redirigir al inicio si no tiene permisos
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;