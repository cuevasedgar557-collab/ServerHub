const agentService =
    require("../services/agent.service");

async function registerAgent(req, res) {

    try {

        const result =
            await agentService.registerAgent(
                req.body
            );

        res.status(201).json({
            success: true,
            ...result
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
}

async function heartbeat(req, res) {

    try {

        const { agentToken } = req.body;

        await agentService.heartbeat(
            agentToken
        );

        res.json({
            success: true,
            message: "Heartbeat recibido"
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
}

async function saveStats(req, res) {

    try {

        const stats =
            await agentService.saveStats(
                req.body
            );

        res.status(201).json({
            success: true,
            stats
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
}

module.exports = {
    registerAgent,
    heartbeat,
    saveStats
};
