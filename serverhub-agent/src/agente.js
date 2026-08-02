const config = require("./config/config.json");

const {
    registerAgent
} = require("./services/register.service");

const {
    iniciarHeartbeat
} = require("./services/heartbeat.service");

async function iniciarAgente() {

    try {

        if (config.agentToken) {

            console.log(
                "✅ Agente ya registrado"
            );

            console.log(
                "Token:",
                config.agentToken
            );

            iniciarHeartbeat();

            return;
        }

        const resultado = await registerAgent(
            "SHUB-9262-B556"
        );

        console.log(
            "✅ Agente registrado"
        );

        console.log(resultado);

        iniciarHeartbeat();

    } catch (error) {

        console.error(
            "❌ Error:",
            error.response?.data || error.message
        );

    }

}

module.exports = {
    iniciarAgente
};