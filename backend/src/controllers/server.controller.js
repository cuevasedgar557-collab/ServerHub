const serverService = require("../services/server.service");
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


async function createServer(req, res) {
    try {

        const server = await serverService.createServer(
            req.user.id,
            req.body
        );

        res.status(201).json({
            success: true,
            server
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
}

async function getServers(req, res) {
    try {

        const servers = await serverService.getServers(
            req.user.id
        );

        res.json({
            success: true,
            servers
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}
module.exports = {
    getHealth,
    getServerInfo,
    createServer,
    getServers
};