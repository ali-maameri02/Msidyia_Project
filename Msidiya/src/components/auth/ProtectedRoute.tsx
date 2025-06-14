import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ("Student" | "Tutor" | "Ms_seller")[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // If still loading, you might want to show a loading spinner
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // If no user is logged in, redirect to home page
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles && !allowedRoles.includes(user.Role as any)) {
    // Redirect to appropriate dashboard based on user role
    if (user.Role === "Student") {
      return <Navigate to="/dashboardstudent" replace />;
    } else if (user.Role === "Tutor") {
      return <Navigate to="/dashboard" replace />;
    } else if (user.Role === "Ms_seller") {
      return <Navigate to="/dashboardseller" replace />;
    }
    // If role doesn't match any known role, redirect to home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
