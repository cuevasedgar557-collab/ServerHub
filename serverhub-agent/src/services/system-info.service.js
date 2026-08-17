const axios = require("axios");

const config = require("../config/config.json");
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

async function enviarInformacionSistema() {

    try {

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
    config.agentSecret
);

await axios.post(
    `${config.apiUrl}/api/agent/system-info`,
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

        console.log(
            "💻 Información del sistema enviada"
        );

    } catch (error) {

        console.error(
            "❌ Error enviando información del sistema:",
            error.response?.data ||
            error.message
        );

    }

}

module.exports = {
    enviarInformacionSistema
};