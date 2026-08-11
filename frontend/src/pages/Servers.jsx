import { useEffect, useState } from "react";
import { getServers } from "../services/serverService";

function Servers() {

  const [servers, setServers] = useState([]);

  useEffect(() => {

    async function cargarServidores() {

      try {

        const token = localStorage.getItem("token");

        const datos = await getServers(token);

        console.log(datos);

        setServers(datos.servers);

      } catch (error) {

        console.error(error);

      }

    }

    cargarServidores();

  }, []);

  return (
    <div>

      <h2>Mis Servidores</h2>

      {servers.map((server) => (
        <div key={server.id}>

          <p>ID: {server.id}</p>

          <p>Nombre: {server.name}</p>

          <p>Estado: {server.status}</p>

          <hr />

        </div>
      ))}

    </div>
  );
}

export default Servers;