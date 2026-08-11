import { useEffect, useState } from "react";
import { getServers } from "../services/serverService";
import ServerCard from "../components/servers/ServerCard";
import AddServerModal from "../components/servers/AddServerModal";
import Button from "../components/ui/Button";

function Servers() {

  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  async function cargarServidores() {

    try {

      const token = localStorage.getItem("token");

      const datos = await getServers(token);

      setServers(datos.servers || []);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    cargarServidores();

  }, []);

  return (
    <>
      <div className="section__head">
        <div>
          <p className="section__eyebrow">Infraestructura</p>
          <h2 className="section__title">Mis servidores</h2>
        </div>

        <Button variant="primary" onClick={() => setShowModal(true)}>
          Agregar servidor
        </Button>
      </div>

      {!loading && servers.length === 0 && (
        <div className="empty-state">
          <strong>Aún no tienes servidores</strong>
          Agrega tu primer VPS para empezar a monitorearlo.
        </div>
      )}

      <div className="server-list">
        {servers.map((server) => (
          <ServerCard key={server.id} server={server} />
        ))}
      </div>

      {showModal && (
        <AddServerModal
          onClose={() => setShowModal(false)}
          onCreated={cargarServidores}
        />
      )}
    </>
  );
}

export default Servers;