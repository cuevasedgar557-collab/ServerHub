const {
    listarProcesos
} = require(
    "./process.service"
);
const {
    listarServicios
} = require(
    "./service.service"
);

async function executeCommand(
    command
) {

    switch (
        command.command_type
    ) {

        case "PING":

            return {
                message: "PONG"
            };

        case "LIST_PROCESSES":

    return {
        processes: await listarProcesos()
    };

    case "LIST_SERVICES":

    return {
        services:
            await listarServicios()
    };

        default:

            throw new Error(
                `Comando no soportado: ${command.command_type}`
            );

    }

}

module.exports = {
    executeCommand
};