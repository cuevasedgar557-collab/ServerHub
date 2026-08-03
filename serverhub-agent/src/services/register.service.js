const axios = require("axios");
const fs = require("fs");
const path = require("path");
const {
    obtenerInformacionSistema
} = require("./system.service");


const configPath = path.join(
    __dirname,
    "../config/config.json"
);

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

    config.agentToken = agentToken;

    fs.writeFileSync(
        configPath,
        JSON.stringify(
            config,
            null,
            4
        )
    );

    return response.data;
}

module.exports = {
    registerAgent
};