import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getServerById,
  getServerAgent,
  getServerMetrics,
  getLatestMetrics
} from "../services/serverService";
import AppShell from "../components/layout/AppShell";
import StatusDot from "../components/ui/StatusDot";
import StatCard from "../components/dashboard/StatCard";
import MetricsChart from "../components/servers/MetricsChart";

function ServerDetail() {
  const { id } = useParams();

  const [server, setServer] = useState(null);
  const [agent, setAgent] = useState(null);
  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function cargar() {

      try {

        const token = localStorage.getItem("token");

        const [serverDatos, agentDatos, latestDatos, metricsDatos] =
          await Promise.all([
            getServerById(token, id),
            getServerAgent(token, id),
            getLatestMetrics(token, id),
            getServerMetrics(token, id)
          ]);

        if (serverDatos.success) setServer(serverDatos.server);
        if (agentDatos.success) setAgent(agentDatos.agent);
        if (latestDatos.success) setLatest(latestDatos.data);
        if (metricsDatos.success) setHistory(metricsDatos.metrics || []);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    cargar();

  }, [id]);

  const online = latest?.connectionStatus === "online";
  const latestMetrics = latest?.metrics;

  // El backend entrega lo más reciente primero; para el gráfico
  // necesitamos orden cronológico (de más viejo a más nuevo).
  const chronological = [...history].reverse();
  const cpuHistory = chronological.map((m) => Number(m.cpu_usage));
  const ramHistory = chronological.map((m) => Number(m.ram_usage));
  const diskHistory = chronological.map((m) => Number(m.disk_usage));

  return (
    <AppShell>
      <Link to="/dashboard" className="back-link">
        ← Volver al dashboard
      </Link>

      {loading && <p className="section__eyebrow">Cargando...</p>}

      {!loading && !server && (
        <div className="empty-state">
          <strong>No encontramos este servidor</strong>
          Puede que haya sido eliminado.
        </div>
      )}

      {server && (
        <>
          <section className="section detail-head">
            <div>
              <p className="section__eyebrow">Servidor</p>
              <h2 className="detail-head__name">
                <StatusDot active={online} />
                {server.name}
              </h2>
              {server.description && (
                <p className="detail-head__desc">{server.description}</p>
              )}
            </div>

            <span className="server-card__status">
              {online ? "En línea" : "Sin conexión"}
            </span>
          </section>

          <section className="section">
            <div className="stat-grid">
              <StatCard
                label="CPU actual"
                value={latestMetrics ? Number(latestMetrics.cpu_usage) : "—"}
                unit={latestMetrics ? "%" : ""}
                progress={
                  latestMetrics ? Number(latestMetrics.cpu_usage) : undefined
                }
              />
              <StatCard
                label="RAM actual"
                value={latestMetrics ? Number(latestMetrics.ram_usage) : "—"}
                unit={latestMetrics ? "%" : ""}
                progress={
                  latestMetrics ? Number(latestMetrics.ram_usage) : undefined
                }
              />
              <StatCard
                label="Disco actual"
                value={latestMetrics ? Number(latestMetrics.disk_usage) : "—"}
                unit={latestMetrics ? "%" : ""}
                progress={
                  latestMetrics ? Number(latestMetrics.disk_usage) : undefined
                }
              />
              <StatCard
                label="Versión del agente"
                value={agent?.version || "—"}
              />
            </div>
          </section>

          <section className="section">
            <p className="section__eyebrow">Historial reciente</p>
            <div className="metrics-grid">
              <MetricsChart
                label="CPU"
                values={cpuHistory}
                current={cpuHistory[cpuHistory.length - 1]}
              />
              <MetricsChart
                label="RAM"
                values={ramHistory}
                current={ramHistory[ramHistory.length - 1]}
              />
              <MetricsChart
                label="Disco"
                values={diskHistory}
                current={diskHistory[diskHistory.length - 1]}
              />
            </div>
          </section>
        </>
      )}
    </AppShell>
  );
}

export default ServerDetail;