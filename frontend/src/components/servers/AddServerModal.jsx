import { useState } from "react";
import { createServer } from "../../services/serverService";
import { createRegistrationKey } from "../../services/registrationKeyService";
import Field from "../ui/Field";
import Button from "../ui/Button";

function AddServerModal({ onClose, onCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrationKey, setRegistrationKey] = useState(null);
  const [copied, setCopied] = useState(false);

  async function crearServidor(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const datos = await createServer(token, { name, description });

      if (!datos.success) {
        setError(datos.message || "No se pudo crear el servidor");
        return;
      }

      onCreated();

      const keyDatos = await createRegistrationKey(
        token,
        datos.server.id
      );

      if (keyDatos.success) {
        setRegistrationKey(keyDatos.key.registration_key);
      } else {
        onClose();
      }
    } catch (error) {
      console.error(error);
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  function copiarClave() {
    navigator.clipboard.writeText(registrationKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {!registrationKey ? (
          <>
            <h3 className="modal__title">Agregar servidor</h3>
            <p className="modal__sub">
              Regístralo aquí y luego vincula el agente con la clave que te
              daremos.
            </p>

            <form onSubmit={crearServidor} noValidate>
              {error && (
                <div className="sh-alert" role="alert">
                  {error}
                </div>
              )}

              <Field
                label="Nombre"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Field
                label="Descripción (opcional)"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="modal__actions">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Creando..." : "Crear servidor"}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h3 className="modal__title">Servidor creado</h3>
            <p className="modal__sub">
              Instala el agente en tu VPS y usa esta clave para vincularlo.
              Vence en 24 horas.
            </p>

            <div className="key-box">
              <span className="key-box__value">{registrationKey}</span>
              <Button type="button" variant="ghost" onClick={copiarClave}>
                {copied ? "Copiado" : "Copiar"}
              </Button>
            </div>

            <div className="modal__actions">
              <Button
                type="button"
                variant="primary"
                className="sh-btn--block"
                onClick={onClose}
              >
                Listo
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AddServerModal;