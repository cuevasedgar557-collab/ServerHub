import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import AppShell from "../components/layout/AppShell";
import StatCard from "../components/dashboard/StatCard";
import Servers from "./Servers";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {

    async function cargarDashboard() {

      try {

        const token = localStorage.getItem("token");

        const datos = await getDashboard(token);

        setDashboard(datos.dashboard);

      } catch (error) {

        console.error(error);

      }

    }

    cargarDashboard();

  }, []);

  return (
    <AppShell>
      <section className="section">
        <p className="section__eyebrow">Resumen</p>
        <h2 className="section__title">Bienvenido a ServerHub</h2>
      </section>

      {dashboard && (
        <section className="section">
          <div className="stat-grid">
            <StatCard label="Servidores" value={dashboard.totalServers} />
            <StatCard label="En línea" value={dashboard.onlineServers} />
            <StatCard label="Sin conexión" value={dashboard.offlineServers} />
            <StatCard label="Agentes" value={dashboard.totalAgents} />
            <StatCard
              label="CPU promedio"
              value={dashboard.avgCpu}
              unit="%"
              progress={dashboard.avgCpu}
            />
            <StatCard
              label="RAM promedio"
              value={dashboard.avgRam}
              unit="%"
              progress={dashboard.avgRam}
            />
            <StatCard
              label="Disco promedio"
              value={dashboard.avgDisk}
              unit="%"
              progress={dashboard.avgDisk}
            />
          </div>
        </section>
      )}

      <section className="section">
        <Servers />
      </section>
    </AppShell>
  );
}

export default Dashboard;