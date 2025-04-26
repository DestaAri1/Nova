import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext.tsx";

const LoadingScreen = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

interface ProtectedRouteProps {
  requireAdmin?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({
  requireAdmin = false,
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const { user, loading } = useUserContext();

  // Show loading screen while determining authentication state
  if (loading) {
    return <LoadingScreen />;
  }

  // Not logged in
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Role is not admin when accessing admin-only pages
  if (requireAdmin && user.role.name.toLowerCase() !== "administrator") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const PublicRoute = () => {
  const { user, loading } = useUserContext();

  // Show loading screen while determining authentication state
  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export { ProtectedRoute, PublicRoute };
