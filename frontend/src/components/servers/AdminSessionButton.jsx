import { useState } from "react";
import { createAdminSession, logoutAdminSession } from "../../services/adminSessionService";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import { useToast } from "../ui/Toast";

function AdminSessionButton({ serverId, session, onUnlock, onLock }) {

  const [showUnlock, setShowUnlock] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState("");
  const showToast = useToast();

  async function desbloquear(password) {

    setUnlocking(true);
    setUnlockError("");

    try {

      const token = localStorage.getItem("token");
      const datos = await createAdminSession(token, serverId, password);

      if (!datos.success) {
        setUnlockError(datos.message || "Contraseña administrativa incorrecta");
        return;
      }

      onUnlock({ token: datos.token, expiresAt: datos.expiresAt });
      setShowUnlock(false);
      showToast("Acceso administrativo desbloqueado");

    } catch (error) {

      console.error(error);
      setUnlockError("No se pudo conectar con el servidor");

    } finally {

      setUnlocking(false);

    }

  }

  async function cerrarSesion() {

    try {

      const token = localStorage.getItem("token");
      await logoutAdminSession(token, serverId, session.token);

    } catch (error) {

      console.error(error);

    } finally {

      onLock();
      showToast("Sesión administrativa cerrada");

    }

  }

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => (session ? cerrarSesion() : setShowUnlock(true))}
      >
        {session ? "Cerrar sesión administrativa" : "Panel administrativo"}
      </Button>

      {showUnlock && (
        <ConfirmDialog
          title="Acceso administrativo"
          message="Ingresá la clave administrativa del servidor para continuar."
          confirmLabel="Desbloquear"
          loadingLabel="Verificando..."
          loading={unlocking}
          requirePassword
          passwordError={unlockError}
          onCancel={() => {
            setShowUnlock(false);
            setUnlockError("");
          }}
          onConfirm={desbloquear}
        />
      )}
    </>
  );
}

export default AdminSessionButton;