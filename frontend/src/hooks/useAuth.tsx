import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
  getUser as getUserApi,
} from "../services/AuthServices.tsx";
import { getToken, removeToken } from "../services/TokenSevices.tsx";

interface User {
  id: number;
  email: string;
  username?: string;
  [key: string]: any;
}

interface AuthContextType {
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string) => Promise<any>;
  logout: () => void;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  fetchUser: (force?: boolean) => Promise<User | null>;
  error: string | null;
}

export default function useAuth(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchPromise = useRef<Promise<User | null> | null>(null);
  const mounted = useRef<boolean>(false);
  const userFetched = useRef<boolean>(false);

  const fetchUser = useCallback(
    async (force = false): Promise<User | null> => {
      if (!getToken()) {
        setIsLoading(false);
        return null;
      }

      if (user && userFetched.current && !force) {
        setIsLoading(false);
        return user;
      }

      if (fetchPromise.current) {
        return fetchPromise.current;
      }

      try {
        setIsLoading(true);
        fetchPromise.current = getUserApi();
        const userData = await fetchPromise.current;

        if (mounted.current) {
          setUser(userData);
          userFetched.current = true;
        }

        return userData;
      } catch (error) {
        console.error("Error fetching user:", error);
        if (mounted.current) {
          logout();
        }
        return null;
      } finally {
        fetchPromise.current = null;
        if (mounted.current) {
          setIsLoading(false);
        }
      }
    },
    [user]
  );

  const logout = useCallback(() => {
    removeToken();
    logoutApi(); // optional call to backend
    setUser(null);
    userFetched.current = false;
    setIsLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    mounted.current = true;

    const initAuth = async () => {
      if (getToken() && !userFetched.current) {
        await fetchUser();
      } else {
        setIsLoading(false);
      }
    };

    initAuth();

    return () => {
      mounted.current = false;
    };
  }, [fetchUser]);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await loginApi({ email, password });
        if (mounted.current) {
          await fetchUser(true);
        }
        Cookies.set()
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.response.data.message
            : "Failed to login. Please try again.";

        if (mounted.current) {
          setError(errorMessage);
        }
        throw err;
      } finally {
        if (mounted.current) {
          setIsLoading(false);
        }
      }
    },
    [fetchUser]
  );

  const register = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await registerApi({ email, password });
        if (mounted.current) {
          await fetchUser(true);
        }
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.response.data.message
            : "Failed to register. Please try again.";

        if (mounted.current) {
          setError(errorMessage);
        }
        throw err;
      } finally {
        if (mounted.current) {
          setIsLoading(false);
        }
      }
    },
    [fetchUser]
  );

  const authValue = useMemo(
    () => ({
      login,
      register,
      logout,
      user,
      setUser,
      isLoading,
      fetchUser,
      error,
    }),
    [login, register, logout, user, isLoading, fetchUser, error]
  );

  return authValue;
}
