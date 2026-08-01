const axios = require("axios");
const fs = require("fs");
const path = require("path");

const configPath = path.join(
    __dirname,
    "../config/config.json"
);

async function registerAgent(
    registrationKey
) {

    const config =
        require("../config/config.json");

    const response = await axios.post(
        `${config.apiUrl}/api/agent/register`,
        {
            registrationKey,
            version: "1.0.0"
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