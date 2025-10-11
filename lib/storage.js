import { jwtDecode } from "jwt-decode";

const key = "promptr-auth-token";

// Helper to get cookie value by name
function getCookie(name) {
  if (typeof document === "undefined") return;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const getToken = () => {
  if (typeof window === "undefined") return;

  try {
    return getCookie(key);
  } catch (error) {
    console.log(error);
  }
};

const getUser = () => {
  if (typeof window === "undefined") return;

  const token = getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = () => {
  if (typeof window === "undefined") return;

  try {
    // Set the cookie to expire in the past
    document.cookie = `${key}=; Max-Age=0; path=/;`;
  } catch (error) {
    console.log(error);
  }
};

const storage = { getToken, getUser, removeToken };

export default storage;
