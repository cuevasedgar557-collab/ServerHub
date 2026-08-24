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

export async function getServerById(token, id) {

  const respuesta = await fetch(
    `${API_URL}/api/server/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await respuesta.json();
}

export async function updateServer(token, id, data) {

  const respuesta = await fetch(
    `${API_URL}/api/server/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }
  );

  return await respuesta.json();
}

export async function deleteServer(token, id) {

  const respuesta = await fetch(
    `${API_URL}/api/server/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await respuesta.json();
}

export async function getServerAgent(token, id) {

  const respuesta = await fetch(
    `${API_URL}/api/server/${id}/agent`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await respuesta.json();
}

export async function getServerMetrics(token, id) {

  const respuesta = await fetch(
    `${API_URL}/api/server/${id}/metrics`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await respuesta.json();
}

export async function getLatestMetrics(token, id) {

  const respuesta = await fetch(
    `${API_URL}/api/server/${id}/latest`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await respuesta.json();
}


export async function verifyServerPassword(token, id, password) {

  const respuesta = await fetch(
    `${API_URL}/api/server/${id}/verify-password`,
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