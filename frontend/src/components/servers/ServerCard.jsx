import StatusDot from "../ui/StatusDot";

function ServerCard({ server }) {
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

      <span className="server-card__status">
        {online ? "En línea" : "Sin conexión"}
      </span>
    </div>
  );
}

export default ServerCard;