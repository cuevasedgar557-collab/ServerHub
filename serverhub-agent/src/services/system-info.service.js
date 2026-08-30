const axios = require("axios");

const config = require("../config/config.json");
const logger = require("../utils/logger");
const { generarFirma } =
    require("../utils/signature");

const {
    obtenerInformacionSistema
} = require("./system.service");

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

async function enviarInformacionSistema() {

    try {

        const credentials =
    loadCredentials();

        const sistema =
            obtenerInformacionSistema(
                config.version
            );

        const payload = {
    hostname: sistema.hostname,
    operatingSystem:
        sistema.plataforma,
    architecture:
        sistema.arquitectura,
    version:
        config.version,
    timestamp:
        Date.now(),
        nonce: generarNonce()
};

const firma = generarFirma(
    JSON.stringify(payload),
    credentials.agentSecret
);

await axios.post(
    `${config.apiUrl}/api/agent/system-info`,
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

        logger.info(
            "💻 Información del sistema enviada"
        );

    } catch (error) {

        logger.error(
            `❌ Error enviando información del sistema: ${
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

module.exports = {
    enviarInformacionSistema
};