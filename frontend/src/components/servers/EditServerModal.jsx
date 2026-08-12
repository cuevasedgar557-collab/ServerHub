import { useState } from "react";
import { updateServer } from "../../services/serverService";
import Field from "../ui/Field";
import Button from "../ui/Button";

function EditServerModal({ server, onClose, onUpdated }) {
  const [name, setName] = useState(server.name || "");
  const [description, setDescription] = useState(server.description || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function guardarCambios(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const datos = await updateServer(token, server.id, {
        name,
        description,
        status: server.status
      });

      if (!datos.success) {
        setError(datos.message || "No se pudo actualizar el servidor");
        return;
      }

      onUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal__title">Editar servidor</h3>
        <p className="modal__sub">Actualiza el nombre o la descripción.</p>

        <form onSubmit={guardarCambios} noValidate>
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
              {loading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditServerModal;