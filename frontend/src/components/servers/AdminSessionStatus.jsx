import { useEffect, useState } from "react";
import StatusDot from "../ui/StatusDot";
import { useToast } from "../ui/Toast";

function formatearRestante(ms) {
  const totalSegundos = Math.max(0, Math.floor(ms / 1000));
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;
  return `${minutos}:${segundos.toString().padStart(2, "0")}`;
}

function AdminSessionStatus({ session, onExpire }) {

  const [remaining, setRemaining] = useState(0);
  const showToast = useToast();

  useEffect(() => {

    function tick() {
      const restante = new Date(session.expiresAt).getTime() - Date.now();

      if (restante <= 0) {
        onExpire();
        showToast("La sesión administrativa expiró", "danger");
        return;
      }

      setRemaining(restante);
    }

    tick();
    const intervalo = setInterval(tick, 1000);

    return () => clearInterval(intervalo);

  }, [session, onExpire, showToast]);

  return (
    <section className="section">
      <div className="section__head">
        <div>
          <p className="section__eyebrow">Seguridad</p>
          <h2 className="section__title">Panel administrativo</h2>
        </div>
      </div>

      <div className="admin-session__status">
        <StatusDot active />
        Sesión activa · expira en {formatearRestante(remaining)}
      </div>
    </section>
  );
}

export default AdminSessionStatus;