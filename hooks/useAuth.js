import { useAtom } from "jotai";
import authStorage from "@/lib/storage";
import apiClient from "@/lib/apiClient";
import { currentUserAtom } from "@/config/state";

export default function useAuth() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const key = "promptr-auth-user";
  const tokenKey = "promptr-auth-token";

  const logIn = (data, token) => {
    const { user } = data;

    if (token) {
      document.cookie = `${tokenKey}=${token}; path=/;`;
    }
    setCurrentUser(user);
  };

  const logOut = async () => {
    authStorage.removeToken();
    localStorage.removeItem(key);

    window.open("/auth/login", "_self");
  };

  const updateUser = async () => {
    if (!currentUser) return;

    const { data, ok } = await apiClient.get("/users/me");
    if (data?.state < 0 || !ok) {
      console.log("Err in updateUser in useAuth:", data);
      throw new Error("An error occured. Please try again later.");
    }

    localStorage.setItem(key, JSON.stringify(data.user));

    setCurrentUser(data.user);
  };

  return {
    logIn,
    logOut,
    setCurrentUser,
    currentUser,
    updateUser,
  };
}
