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

const {
    listarArchivos,
    leerArchivo,
    escribirArchivo,
    crearCarpeta
} = require(
    "./file.service"
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

        case "FILE_BROWSER":

    return await listarArchivos(
        command.payload?.path
    );

        case "DOWNLOAD_FILE":

    return await leerArchivo(
        command.payload?.path
    );

        case "UPLOAD_FILE":

    return await escribirArchivo(
        command.payload?.path,
        command.payload?.content
    );

        case "CREATE_FOLDER":

    return await crearCarpeta(
        command.payload?.path
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