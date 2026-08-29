const axios = require("axios");

const {
    obtenerInformacionSistema
} = require("./system.service");

const {
    saveCredentials
} = require("./credentials.service");

async function registerAgent(
    registrationKey
) {

    const config =
        require("../config/config.json");

    const sistema =
        obtenerInformacionSistema(
            config.version
        );

    const response = await axios.post(
        `${config.apiUrl}/api/agent/register`,
        {
            registrationKey,
            version: config.version,
            hostname: sistema.hostname,
            operatingSystem: sistema.plataforma,
            architecture: sistema.arquitectura
        }
    );

    const agentToken =
        response.data.agentToken;

    const agentSecret =
        response.data.agentSecret;

    saveCredentials(
        agentToken,
        agentSecret
    );

    return response.data;
}

module.exports = {
    registerAgent
};