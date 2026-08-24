export async function handleResponse(respuesta) {

  if (respuesta.status === 401) {

    localStorage.removeItem("token");

    window.location.href = "/login";

    return null;

  }

  return await respuesta.json();

}