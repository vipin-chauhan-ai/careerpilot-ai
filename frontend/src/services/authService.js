import api from "./api";

export async function registerUser(payload) {
  const response = await api.post("api/v1/auth/register", payload);
  return response.data;
}

export async function loginUser(payload) {
  const response = await api.post("api/v1/auth/login", payload);
  return response.data;
}

export async function refreshAccessToken(refreshToken) {
  const response = await api.post("api/v1/auth/refresh", {
    refresh_token: refreshToken
  });
  return response.data;
}

export function getApiErrorMessage(error) {
  const detail = error.response?.data?.detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg).join(", ");
  }

  return "Unable to complete the request";
}