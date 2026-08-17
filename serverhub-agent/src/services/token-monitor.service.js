const axios = require("axios");

const config =
    require("../config/config.json");

const { generarFirma } =
    require("../utils/signature");

const { generarNonce } =
    require("../utils/nonce");

const {
    renovarToken
} = require(
    "./token-refresh.service"
);

async function verificarToken() {

    try {

        const payload = {
            timestamp: Date.now(),
            nonce: generarNonce()
        };

        const firma = generarFirma(
            JSON.stringify(payload),
            config.agentSecret
        );

        const response =
            await axios.post(
                `${config.apiUrl}/api/agent/token-info`,
                payload,
                {
                    headers: {
                        "X-Agent-Token":
                            config.agentToken,

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

            console.log(
                "🔄 Renovación preventiva de token"
            );

            await renovarToken();

        }

    } catch (error) {

        console.error(
            "❌ Error verificando token:",
            error.response?.data ||
            error.message
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