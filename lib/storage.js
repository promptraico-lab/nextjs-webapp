import { jwtDecode } from "jwt-decode";

const key = "promptr-auth-token";

const getToken = () => {
  if (typeof window == "undefined") return;

  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
};

const getUser = () => {
  if (typeof window == "undefined") return;

  const token = getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = () => {
  if (typeof window == "undefined") return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

// removeToken();

export default { getToken, getUser, removeToken };
