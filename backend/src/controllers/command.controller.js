const commandService =
    require("../services/command.service");

async function getPendingCommand(
    req,
    res
) {

    try {

        const command =
            await commandService
                .getPendingCommand(
                    req.agent.id
                );

        res.json({
            success: true,
            command
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

async function completeCommand(
    req,
    res
) {

    try {

        const command =
            await commandService
                .completeCommand(
                    req.body.commandId,
                    req.body.result,
                    req.body.status || "COMPLETED"
                );

        res.json({
            success: true,
            command
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

async function createCommand(
    req,
    res
) {

    try {

        const command =
            await commandService
                .createCommand(
                    req.body.agentId,
                    req.body.commandType,
                    req.body.payload || {}
                );

        res.status(201).json({
            success: true,
            command
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}
module.exports = {
    getPendingCommand,
    completeCommand,
    createCommand
};