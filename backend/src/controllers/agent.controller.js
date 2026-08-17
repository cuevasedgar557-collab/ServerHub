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

        await agentService.heartbeat(
            req.agent.agent_token
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
                req.agent.id,
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



async function saveSystemInfo(req, res) {

    try {

        const agent =
            await agentService.saveSystemInfo(
                req.agent.id,
                req.body
            );

        res.json({
            success: true,
            agent
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
    saveStats,
    saveSystemInfo
};

