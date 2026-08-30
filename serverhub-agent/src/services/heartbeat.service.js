const axios = require("axios");
const config = require("../config/config.json");
const logger = require("../utils/logger");
const { generarFirma } = require("../utils/signature");
const {
    generarNonce
} = require(
    "../utils/nonce"
);
const {
    decommissionAgent
} = require(
    "./decommission.service"
);

const {
    loadCredentials
} = require(
    "./credentials.service"
);

async function enviarHeartbeat() {
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

        await axios.post(
            `${config.apiUrl}/api/agent/heartbeat`,
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

        logger.info("💓 Heartbeat enviado");

    } catch (error) {

        logger.error(
            `❌ Error enviando heartbeat: ${
        typeof error.response?.data === "object"
            ? JSON.stringify(error.response.data)
            : error.response?.data || error.message
    }`
        );

        const response =
    error.response?.data;

if (
    response?.message ===
    "Agent token inválido"
) {

    decommissionAgent();

}

    }
}

function iniciarHeartbeat() {

    const intervalo =
        config.heartbeatIntervalMs || 60000;

    enviarHeartbeat();

    setInterval(
        enviarHeartbeat,
        intervalo
    );

}

module.exports = {
    iniciarHeartbeat
};