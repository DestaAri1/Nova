import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.tsx"; // pastikan path sesuai dengan letak file useAuth

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // kamu bisa ganti ini dengan spinner yang lebih proper
  }

  // jika tidak ada user, redirect ke login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const PublicRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // bisa diganti spinner loading
  }

  // Jika user sudah login, redirect ke dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export { PublicRoute, ProtectedRoute };
