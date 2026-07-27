const getHealth = (req, res) => {
    res.json({
        status: "ok",
        message: "🚀 ServerHub Backend funcionando"
    });
};

const getServerInfo = (req, res) => {
    res.json({
        nombre: "Mi VPS",
        sistema: "Ubuntu 24.04",
        cpu: "2 vCPU",
        memoria: "4 GB",
        almacenamiento: "80 GB",
        estado: "En línea"
    });
};

module.exports = {
    getHealth,
    getServerInfo
};