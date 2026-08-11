import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import AuthLayout from "../components/auth/AuthLayout";
import Field from "../components/ui/Field";
import Button from "../components/ui/Button";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function iniciarSesion(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const datos = await login(email, password);

      if (datos.success) {
        localStorage.setItem("token", datos.token);
        navigate("/dashboard", { replace: true });
      } else {
        setError(datos.message || "No se pudo iniciar sesión");
      }
    } catch (error) {
      console.error(error);
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <form onSubmit={iniciarSesion} noValidate>
        <p className="auth__eyebrow">Acceso</p>
        <h2 className="auth__heading">Iniciar sesión</h2>
        <p className="auth__sub">Entra para ver el estado de tus servidores.</p>

        {error && (
          <div className="sh-alert" role="alert">
            {error}
          </div>
        )}

        <Field
          label="Correo"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Field
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="primary" className="sh-btn--block" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>

        <p className="auth__switch">
          ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;