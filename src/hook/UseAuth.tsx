import { useEffect, useState } from "react";
import TokenService from "../api/token/TokenService";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!TokenService.getToken());
  const [userRole, setUserRole] = useState<string | null>(TokenService.getRole());
  const [userId, setUserId] = useState<string | null>(TokenService.getuserId());

  useEffect(() => {
    const handleStorageChange = () => {
      const token = TokenService.getToken();
      const loggedIn = !!token;
      setIsLoggedIn(loggedIn);
      setUserRole(TokenService.getRole());
      setUserId(TokenService.getuserId());
    };

    // Check auth status initially
    handleStorageChange();

    // Listen for storage changes
    window.addEventListener("storage", handleStorageChange);
    
    // Check for token changes periodically
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const login = (token: string): void => {
    TokenService.setToken(token);
    setIsLoggedIn(true);
    setUserRole(TokenService.getRole());
    setUserId(TokenService.getuserId());
  };

  const logout = (): void => {
    TokenService.removeToken();
    setIsLoggedIn(false);
    setUserRole(null);
    setUserId(null);
  };

  return { 
    isLoggedIn, 
    isLoggedOut: !isLoggedIn, // This is a boolean value, not a function
    userRole,
    userId,
    login,
    logout 
  };
};

export default useAuth;