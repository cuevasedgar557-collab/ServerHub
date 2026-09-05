import API_URL from "../config/api";

export async function createAdminSession(token, serverId, password) {

  const respuesta = await fetch(
    `${API_URL}/api/server/${serverId}/admin-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ password })
    }
  );

  return await respuesta.json();
}

export async function logoutAdminSession(token, serverId, sessionToken) {

  const respuesta = await fetch(
    `${API_URL}/api/server/${serverId}/admin-session/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ token: sessionToken })
    }
  );

  return await respuesta.json();
}