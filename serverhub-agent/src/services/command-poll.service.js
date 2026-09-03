const axios = require("axios");

const config =
    require("../config/config.json");

const logger =
    require("../utils/logger");

const {
    generarFirma
} = require(
    "../utils/signature"
);

const {
    generarNonce
} = require(
    "../utils/nonce"
);

const {
    loadCredentials
} = require(
    "./credentials.service"
);

const {
    executeCommand
} = require(
    "./command-executor.service"
);

async function consultarComandos() {

    try {

        const credentials =
            loadCredentials();

        const payload = {
            timestamp: Date.now(),
            nonce: generarNonce()
        };

        const firma = generarFirma(
            JSON.stringify(payload),
            credentials.agentSecret
        );

        const response =
            await axios.post(
                `${config.apiUrl}/api/agent/commands/pending`,
                payload,
                {
                    headers: {
                        "X-Agent-Token":
                            credentials.agentToken,

                        "X-Agent-Signature":
                            firma
                    }
                }
            );

        const command =
            response.data.command;

        if (!command) {
            return;
        }

        logger.info(
            `📨 Comando recibido: ${command.command_type}`
        );

        let commandStatus =
            "COMPLETED";

        let result;

        try {

            result =
                await executeCommand(
                    command
                );

        } catch (error) {

            commandStatus =
                "FAILED";

            result = {
                error: error.message
            };

            logger.error(
                `❌ Error ejecutando comando ${command.command_type}: ${error.message}`
            );

        }

        const resultPayload = {
            commandId: command.id,
            status: commandStatus,
            result,
            timestamp: Date.now(),
            nonce: generarNonce()
        };

        const resultSignature =
            generarFirma(
                JSON.stringify(
                    resultPayload
                ),
                credentials.agentSecret
            );

        await axios.post(
            `${config.apiUrl}/api/agent/commands/complete`,
            resultPayload,
            {
                headers: {
                    "X-Agent-Token":
                        credentials.agentToken,

                    "X-Agent-Signature":
                        resultSignature
                }
            }
        );

        logger.info(
            `✅ Comando ${command.command_type} finalizado con estado ${commandStatus}`
        );

    } catch (error) {

        logger.error(
            `❌ Error consultando comandos: ${
                typeof error.response?.data === "object"
                    ? JSON.stringify(error.response.data)
                    : error.response?.data || error.message
            }`
        );

    }

}

function iniciarPollingComandos() {

    consultarComandos();

    setInterval(
        consultarComandos,
        10000
    );

}

module.exports = {
    iniciarPollingComandos
};