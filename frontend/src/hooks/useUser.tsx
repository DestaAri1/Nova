import { useEffect, useState } from "react";
import { getToken } from "../services/TokenSevices.tsx";

interface Permission {
  [key: string]: number;
}

interface Role {
  id: string;
  name: string;
  is_active: number;
  permission: Permission[];
}

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  is_active: number;
  role_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  role: Role;
}

interface UserState {
  user: User | null;
  loading: boolean;
}

export default function useUser(): UserState {
  const [state, setState] = useState<UserState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = getToken("user");
      if (storedUser) {
        try {
          const parsedUser: User =
            typeof storedUser === "string"
              ? JSON.parse(storedUser)
              : storedUser;

          setState({ user: parsedUser, loading: false });
        } catch (error) {
          console.error("Error parsing user from localStorage:", error);
          setState({ user: null, loading: false });
        }
      } else {
        setState({ user: null, loading: false });
      }
    };

    fetchUser();
  }, []);

  return state;
}
