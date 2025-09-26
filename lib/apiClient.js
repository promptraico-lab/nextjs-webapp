import { create } from "apisauce";

import authStorage from "@/lib/storage";

const apiUrl =
  process.env.NEXT_PUBLIC_WEBSITE_URL + process.env.NEXT_PUBLIC_API_PREFIX;
const apiClient = create({
  baseURL: apiUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const token = authStorage.getToken();
  if (token) request.headers["X-Auth-Token"] = token;
});

apiClient.addAsyncResponseTransform(async (response, b) => {
  if (response.status === 401) {
    authStorage.removeToken();
    localStorage.removeItem("user");
  }
});

export default apiClient;
