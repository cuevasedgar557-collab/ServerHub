import API_URL from "../config/api";
import { handleResponse } from "./apiClient";

export async function getDashboard(token) {

  const respuesta = await fetch(
    `${API_URL}/api/dashboard`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await handleResponse(respuesta);
}