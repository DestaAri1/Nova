import Cookies from "js-cookie";

// Mendapatkan token dari cookie atau localStorage
export const getToken = (): string | null => {
  return Cookies.get("token") || localStorage.getItem("token");
};

// Menyimpan token ke cookie dan localStorage
export const setToken = (token: string): void => {
  Cookies.set("token", token, {
    expires: 1,
    path: "/",
    sameSite: "Strict",
  });
  localStorage.setItem("token", token);
};

// Menghapus token dari cookie dan localStorage
export const removeToken = (): void => {
  Cookies.remove("token", { path: "/" });
  localStorage.removeItem("token");
};
