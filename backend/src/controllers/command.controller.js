const commandService =
    require("../services/command.service");

const pool =
    require("../config/db");

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

async function downloadCommandFile(
    req,
    res
) {

    try {

        const result =
            await pool.query(
                `
                SELECT result
                FROM agent_commands
                WHERE id = $1
                AND status = 'COMPLETED'
                `,
                [req.params.id]
            );

        const command =
            result.rows[0];

        if (
            !command ||
            !command.result
        ) {

            return res.status(404).json({
                success: false,
                message:
                    "Archivo no encontrado"
            });

        }

        const {
            fileName,
            content
        } = command.result;

        const buffer =
            Buffer.from(
                content,
                "base64"
            );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${fileName}"`
        );

        res.send(buffer);

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
    createCommand,
    downloadCommandFile
};