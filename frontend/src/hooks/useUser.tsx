import { useUserContext } from "../context/UserContext.tsx";

export default function useUser() {
  const { user, loading } = useUserContext();
  return { user, loading };
}
