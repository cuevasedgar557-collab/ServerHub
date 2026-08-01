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

async function getServerById(req, res) {
    try {

        const server = await serverService.getServerById(
            req.user.id,
            req.params.id
        );

        if (!server) {
            return res.status(404).json({
                success: false,
                message: "Servidor no encontrado"
            });
        }

        res.json({
            success: true,
            server
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

async function updateServer(req, res) {
    try {

        const server = await serverService.updateServer(
            req.user.id,
            req.params.id,
            req.body
        );

        if (!server) {
            return res.status(404).json({
                success: false,
                message: "Servidor no encontrado"
            });
        }

        res.json({
            success: true,
            server
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

async function deleteServer(req, res) {
    try {

        const server = await serverService.deleteServer(
            req.user.id,
            req.params.id
        );

        if (!server) {
            return res.status(404).json({
                success: false,
                message: "Servidor no encontrado"
            });
        }

        res.json({
            success: true,
            message: "Servidor eliminado"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}
async function getServerMetrics(req, res) {

    try {

        const metrics =
            await serverService.getServerMetrics(
                req.user.id,
                req.params.id
            );

        res.json({
            success: true,
            metrics
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }
}

async function getLatestMetrics(req, res) {

    try {

        const data =
            await serverService.getLatestMetrics(
                req.user.id,
                req.params.id
            );

        res.json({
            success: true,
            data
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }
}

async function getServerAgent(req, res) {

    try {

        const agent =
            await serverService.getServerAgent(
                req.user.id,
                req.params.id
            );

        res.json({
            success: true,
            agent
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }
}


module.exports = {
    getHealth,
    getServerInfo,
    getLatestMetrics,
    createServer,
    getServers,
    getServerById,
    updateServer,
    deleteServer,
    getServerMetrics,
    getServerAgent
};