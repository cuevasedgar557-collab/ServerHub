import { Link } from "react-router-dom";
import StatusDot from "../ui/StatusDot";
import Button from "../ui/Button";

function ServerCard({ server, onEdit, onDelete }) {
  const online = server.connectionStatus === "online";

  return (
    <div className="server-card">
      <div className="server-card__info">
        <StatusDot active={online} />

        <div className="server-card__text">
          <div className="server-card__name">{server.name}</div>
          <div className="server-card__meta">
            ID {server.id}
            {server.description ? ` · ${server.description}` : ""}
          </div>
        </div>
      </div>

      <div className="server-card__right">
        <span className="server-card__status">
          {online ? "En línea" : "Sin conexión"}
        </span>

        <div className="server-card__actions">
          <Link className="server-card__link" to={`/servers/${server.id}`}>
            Ver
          </Link>

          <Button variant="ghost" className="sh-btn--sm" onClick={onEdit}>
            Editar
          </Button>

          <Button variant="ghost" className="sh-btn--sm" onClick={onDelete}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ServerCard;