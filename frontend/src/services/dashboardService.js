import API_URL from "../config/api";

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

  return await respuesta.json();
}