const axios = require("axios");
const config = require("../config/config.json");

async function enviarHeartbeat() {

    try {

        await axios.post(
            `${config.apiUrl}/api/agent/heartbeat`,
            {
                agentToken: config.agentToken
            }
        );

        console.log(
            "💓 Heartbeat enviado"
        );

    } catch (error) {

        console.error(
            "❌ Error enviando heartbeat:",
            error.response?.data || error.message
        );

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