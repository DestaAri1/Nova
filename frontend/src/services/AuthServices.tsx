import apiClient from "./BaseServices.tsx";
import { removeToken, setToken } from "./TokenSevices.tsx";

interface AuthInput {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: any;
}

// Login
export const login = async (data: AuthInput): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("auth/login", data);
  setToken(response.data.token);
  return response.data;
};

// Register
export const register = async (data: AuthInput): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("auth/register", data);
  return response.data;
};

// Logout
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post("auth/logout");
  } catch (error) {
    console.warn("Logout API gagal, tapi tetap lanjut hapus token", error);
  } finally {
    removeToken();
  }
};

// Get user (dari endpoint yang butuh token)
export const getUser = async (): Promise<any> => {
  const response = await apiClient.get("auth/user");
  return response.data;
};
