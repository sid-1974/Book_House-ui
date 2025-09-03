import { Navigate, Outlet } from "react-router-dom";
import TokenService from "../api/token/TokenService";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = TokenService.getToken();
  const userRole = TokenService.getRole();

  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

 
  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;