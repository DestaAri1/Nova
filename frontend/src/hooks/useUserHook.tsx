import { useEffect, useState, useRef } from "react";
import { getUserData } from "../services/UserServices.tsx";
import { UserInterface } from "../types/Index.tsx";

// Create a global cache for user data
let globalUserCache: UserInterface[] | null = null;
let isRequestInProgress = false;
let requestCallbacks: ((
  data: UserInterface[] | null,
  error: string | null
) => void)[] = [];

export default function useUserHook() {
  const [users, setUsers] = useState<UserInterface[]>(globalUserCache || []);
  const [loading, setLoading] = useState<boolean>(globalUserCache === null);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent effect from running twice in development mode
    if (initialized.current) return;
    initialized.current = true;

    // Function to handle data when received
    const handleData = (data: UserInterface[] | null, error: string | null) => {
      setUsers(data || []);
      setError(error);
      setLoading(false);
    };

    // Use the cached data if it exists
    if (globalUserCache !== null) {
      setUsers(globalUserCache);
      setLoading(false);
      return;
    }

    // If a request is already in progress, just add callback
    if (isRequestInProgress) {
      requestCallbacks.push(handleData);
      return;
    }

    // Start a new request
    isRequestInProgress = true;

    const fetchUser = async () => {
      try {
        const response = await getUserData();
        const userData = response.data.data || [];
        globalUserCache = userData;

        // Call all registered callbacks
        requestCallbacks.forEach((callback) => callback(userData, null));
        requestCallbacks = [];

        // Update current component
        setUsers(userData);
        setLoading(false);
      } catch (err: any) {
        const errorMessage = err.message || "Something went wrong";

        // Notify all waiting components about the error
        requestCallbacks.forEach((callback) => callback(null, errorMessage));
        requestCallbacks = [];

        setError(errorMessage);
        setLoading(false);
      } finally {
        isRequestInProgress = false;
      }
    };

    fetchUser();
    requestCallbacks.push(handleData);

    // Cleanup function
    return () => {
      // Remove this component's callback if it unmounts before data arrives
      requestCallbacks = requestCallbacks.filter((cb) => cb !== handleData);
    };
  }, []); // Empty dependency array ensures effect runs only once

  return { users, loading, error };
}
