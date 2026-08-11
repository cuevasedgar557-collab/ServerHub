import API_URL from "../config/api";

export async function login(email, password) {

  const respuesta = await fetch(
    `${API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    }
  );

  return await respuesta.json();
}

export async function register(name, email, password) {

  const respuesta = await fetch(
    `${API_URL}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    }
  );

  return await respuesta.json();
}