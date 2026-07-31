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

module.exports = {
    registerAgent
};
