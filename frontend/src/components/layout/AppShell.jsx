import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function AppShell({ children }) {
  const navigate = useNavigate();

  function cerrarSesion() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <div className="shell">
      <header className="shell__topbar">
        <div className="shell__brand">
          <span className="shell__brand-mark" />
          ServerHub
        </div>

        <Button variant="ghost" onClick={cerrarSesion}>
          Cerrar sesión
        </Button>
      </header>

      <div className="shell__content">{children}</div>
    </div>
  );
}

export default AppShell;