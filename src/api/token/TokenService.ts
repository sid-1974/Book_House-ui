import { jwtDecode } from "jwt-decode";
import { toast } from "../../utils/toaster/ToastContainer";

class TokenService {
  static setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  static getToken(): string | null {
    return localStorage.getItem("token");
  }

  static decodeToken(): { id: string; userid: string; role: string } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<{ id: string; userid: string; role: string; exp: number }>(token);
      if (decoded.exp * 1000 < Date.now()) {
        this.removeToken(); 
        this.handleTokenExpiration();
        return null;
      }

      return decoded;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }
  static getuserId(): string | null {
    return this.decodeToken()?.userid || null;
  }

  static getId(): string | null {
    return this.decodeToken()?.id || null;
  }

  
  static getRole(): string | null {
    return this.decodeToken()?.role || null;
  }

  static removeToken(): void {
    localStorage.removeItem("token");
  }

  static handleTokenExpiration(): void {
    toast.info("Your session has expired. Please log in again.");
    window.location.href = "/"; 
  }
}

export default TokenService;