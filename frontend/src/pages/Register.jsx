import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, login } from "../services/authService";
import AuthLayout from "../components/auth/AuthLayout";
import Field from "../components/ui/Field";
import Button from "../components/ui/Button";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function crearCuenta(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const datos = await register(name, email, password);

      if (!datos.success) {
        setError(datos.message || "No se pudo crear la cuenta");
        return;
      }

      // Cuenta creada: iniciamos sesión directamente para no pedir
      // los datos dos veces.
      const sesion = await login(email, password);

      if (sesion.success) {
        localStorage.setItem("token", sesion.token);
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
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
      <form onSubmit={crearCuenta} noValidate>
        <p className="auth__eyebrow">Nueva cuenta</p>
        <h2 className="auth__heading">Crear cuenta</h2>
        <p className="auth__sub">
          Registra tus servidores y monitoréalos desde un solo lugar.
        </p>

        {error && (
          <div className="sh-alert" role="alert">
            {error}
          </div>
        )}

        <Field
          label="Nombre"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Field
          label="Confirmar contraseña"
          type="password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button type="submit" variant="primary" className="sh-btn--block" disabled={loading}>
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </Button>

        <p className="auth__switch">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Register;