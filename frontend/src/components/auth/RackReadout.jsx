import { useEffect, useState } from "react";
import StatusDot from "../ui/StatusDot";

// Datos de ejemplo, solo para ambientar el panel de autenticación.
const UNITS = [
  { id: "web-01", label: "web-01.prod", online: true, cpu: 34 },
  { id: "db-02", label: "db-02.prod", online: true, cpu: 58 },
  { id: "cache-03", label: "cache-03.prod", online: true, cpu: 12 },
  { id: "worker-04", label: "worker-04.stg", online: false, cpu: null },
];

function randomWalk(value) {
  const next = value + (Math.random() * 10 - 5);
  return Math.min(92, Math.max(8, Math.round(next)));
}

function RackReadout() {
  const [rows, setRows] = useState(UNITS);

  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) =>
        prev.map((row) =>
          row.online ? { ...row, cpu: randomWalk(row.cpu) } : row
        )
      );
    }, 1800);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="rack" aria-hidden="true">
      <div className="rack__head">
        <span>UNIDAD</span>
        <span>CPU</span>
      </div>

      {rows.map((row) => (
        <div className="rack__row" key={row.id}>
          <span className="rack__label">
            <StatusDot active={row.online} />
            {row.label}
          </span>
          <span className="rack__cpu">
            {row.online ? `${row.cpu}%` : "\u2014"}
          </span>
        </div>
      ))}
    </div>
  );
}

export default RackReadout;