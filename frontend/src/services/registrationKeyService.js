import API_URL from "../config/api";

export async function createRegistrationKey(token, serverId) {

  const respuesta = await fetch(
    `${API_URL}/api/registration-keys`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ serverId })
    }
  );

  return await respuesta.json();
}