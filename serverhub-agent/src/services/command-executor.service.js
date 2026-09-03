const {
    listarProcesos
} = require(
    "./process.service"
);

const {
    listarServicios,
    iniciarServicio,
    detenerServicio,
    reiniciarServicio
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
                processes:
                    await listarProcesos()
            };

        case "LIST_SERVICES":

            return {
                services:
                    await listarServicios()
            };

        case "START_SERVICE":

            return await iniciarServicio(
                command.payload?.serviceName
            );

        case "STOP_SERVICE":

    return await detenerServicio(
        command.payload?.serviceName
    );

        case "RESTART_SERVICE":

    return await reiniciarServicio(
        command.payload?.serviceName
    );

        default:

            throw new Error(
                `Comando no soportado: ${command.command_type}`
            );

    }

}

module.exports = {
    executeCommand
};