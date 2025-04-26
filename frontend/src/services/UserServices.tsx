import apiClient from "./BaseServices.tsx";

export const getUserData = async (): Promise<any> => {
  const response = await apiClient.get("user");
  return response;
};
