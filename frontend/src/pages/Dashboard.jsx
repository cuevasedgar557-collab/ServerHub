import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import Servers from "./Servers";


function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {

    async function cargarDashboard() {

      try {

        const token = localStorage.getItem("token");

        const datos = await getDashboard(token);

        console.log(datos);

        setDashboard(datos.dashboard);

      } catch (error) {

        console.error(error);

      }

    }

    cargarDashboard();

  }, []);

  function cerrarSesion() {

    localStorage.removeItem("token");

    window.location.reload();

  }

  return (
    <div>

      <h1>Dashboard</h1>

      <p>Bienvenido a ServerHub</p>

      {dashboard && (
        <div>

          <p>Total servidores: {dashboard.totalServers}</p>

          <p>Online: {dashboard.onlineServers}</p>

          <p>Offline: {dashboard.offlineServers}</p>

          <p>Agentes: {dashboard.totalAgents}</p>

          <p>CPU promedio: {dashboard.avgCpu}%</p>

          <p>RAM promedio: {dashboard.avgRam}%</p>

          <p>Disco promedio: {dashboard.avgDisk}%</p>

        </div>
      )}

      <button onClick={cerrarSesion}>
        Cerrar Sesión
      </button>

      <hr />

      <Servers />

    </div>
  );
}

export default Dashboard;