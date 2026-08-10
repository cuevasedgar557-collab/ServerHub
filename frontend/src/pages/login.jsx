import { useState } from "react";
import { login } from "../services/authService";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function iniciarSesion() {
  try {

    const datos = await login(
      email,
      password
    );

    if (datos.success) {

      localStorage.setItem(
        "token",
        datos.token
      );
      window.location.reload();
      console.log("Login correcto");
      console.log(datos.user);
      console.log(datos.token);
    } else {
      console.log(datos.message);
    }

  } catch (error) {
    console.error(error);
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

export default Login;