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

export async function createServer(token, data) {

  const respuesta = await fetch(
    `${API_URL}/api/server`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }
  );

  return await respuesta.json();
}