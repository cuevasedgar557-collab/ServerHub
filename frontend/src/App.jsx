import { useState } from "react";
import API_URL from "./config/api";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

async function iniciarSesion() {
  try {
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

    const datos = await respuesta.json();

    if (datos.success) {
      console.log("Login correcto");
      console.log(datos.user);
      console.log(datos.token);
    } else {
      console.log(datos.message);
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

  return (
    <div>
      <h1>ServerHub</h1>

      <h2>Iniciar Sesión</h2>

      <div>
        <label>Correo</label>
        <br />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Contraseña</label>
        <br />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <br />

      <button onClick={iniciarSesion}>
        Ingresar
      </button>

    </div>
  );
}

export default App;