const axios = require("axios");

const config = require("../config/config.json");

const {
    obtenerInformacionSistema
} = require("./system.service");

async function enviarInformacionSistema() {

    try {

        const sistema =
            obtenerInformacionSistema(
                config.version
            );

        await axios.post(
            `${config.apiUrl}/api/agent/system-info`,
            {
                agentToken: config.agentToken,
                hostname: sistema.hostname,
                operatingSystem: sistema.plataforma,
                architecture: sistema.arquitectura,
                version: config.version
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