import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getToken } from "../services/TokenSevices.tsx";
import { UserInterface } from "../types/Index.tsx";

interface UserContextType {
  user: UserInterface | null;
  loading: boolean;
  setUser: (user: UserInterface | null) => void;
  refreshUser: () => void;
}

// Create context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  refreshUser: () => {},
});

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = () => {
    const storedUser = getToken("user");
    if (storedUser) {
      try {
        const parsedUser: UserInterface =
          typeof storedUser === "string" ? JSON.parse(storedUser) : storedUser;
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the context
export function useUserContext() {
  return useContext(UserContext);
}
