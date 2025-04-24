import { useState, useEffect } from "react";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  getUser as getUserService,
} from "../services/AuthServices.tsx";
import { setTokenUser } from "../services/TokenSevices.tsx";

interface UseAuthReturn {
  user: any | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export default function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const storedUser = localStorage.getItem("user");

    if (rememberMe && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const checkAuth = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await getUserService();
      setUser(userData);
    } catch (err) {
      // Don't set an error here - just clear the user silently
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<any> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await loginService({ email, password });

      // After successful login, fetch user data
      if (response && response.token) {
        try {
          const userData = response.data || (await getUserService());
          setUser(userData);
          setTokenUser(userData, "user");

          return response;
        } catch (userErr) {
          console.error("Failed to get user data after login:", userErr);
          // Still return the login response even if getting user failed
          return response;
        }
      }

      return response;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string): Promise<any> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await registerService({ email, password });
      return response;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await logoutService();
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("rememberMe");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Logout failed.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    checkAuth,
  };
}
