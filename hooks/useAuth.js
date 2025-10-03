import { useAtom } from "jotai";
import apiClient from "@/lib/apiClient";
import { currentUserAtom } from "@/config/state";

function setCookie(name, value, days = 7) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + encodeURIComponent(value) + expires + "; path=/;";
}

function deleteCookie(name) {
  document.cookie = name + "=; Max-Age=0; path=/;";
}

export default function useAuth() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const tokenKey = "promptr-auth-token";

  const logIn = (data, token) => {
    if (token) {
      setCookie(tokenKey, token);
    }
    setCurrentUser(data.user);
  };

  const logOut = async () => {
    deleteCookie(tokenKey);
    window.open("/auth/login", "_self");
  };

  const updateUser = async (newUser) => {
    if (newUser) {
      setCurrentUser(newUser);
      return;
    }

    if (!currentUser) return;

    const { data, ok } = await apiClient.get("/users/profile");
    if (data?.state < 0 || !ok) {
      console.log("Err in updateUser in useAuth:", data);
      throw new Error("An error occured. Please try again later.");
    }

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
