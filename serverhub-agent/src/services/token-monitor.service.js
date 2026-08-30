const axios = require("axios");

const config =
    require("../config/config.json");

const logger = require("../utils/logger");
const { generarFirma } =
    require("../utils/signature");

const { generarNonce } =
    require("../utils/nonce");

const {
    renovarToken
} = require(
    "./token-refresh.service"
);

const {
    loadCredentials
} = require(
    "./credentials.service"
);

async function verificarToken() {

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
                `${config.apiUrl}/api/agent/token-info`,
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

        const expiresAt =
            new Date(
                response.data.token_expires_at
            );

        const diasRestantes =
            (
                expiresAt -
                new Date()
            ) /
            (1000 * 60 * 60 * 24);

        if (diasRestantes <= 15) {

            logger.info(
                "🔄 Renovación preventiva de token"
            );

            await renovarToken();

        }

    } catch (error) {

        logger.error(
            `❌ Error verificando token: ${
        typeof error.response?.data === "object"
            ? JSON.stringify(error.response.data)
            : error.response?.data || error.message
    }`
        );

    }

}

function iniciarMonitorToken() {

    verificarToken();

    setInterval(
        verificarToken,
        24 * 60 * 60 * 1000
    );

}

module.exports = {
    verificarToken,
    iniciarMonitorToken
};