import { Navigate, Outlet } from "react-router-dom";
import TokenService from "../api/token/TokenService";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const userRole = TokenService.getRole();

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;