import API_URL from "../config/api";

export async function getServers(token) {

  const respuesta = await fetch(
    `${API_URL}/api/server`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await respuesta.json();
}