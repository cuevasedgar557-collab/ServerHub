const config = require("./config/config.json");

const {
    registerAgent
} = require("./services/register.service");

const {
    iniciarHeartbeat
} = require("./services/heartbeat.service");

const {
    iniciarMetricas
} = require("./services/stats.service");

async function iniciarAgente() {

    try {

        console.log("");
        console.log(
            `🚀 Iniciando ServerHub Agent v${config.version}`
        );
        console.log("");

        console.log(
            "✅ Configuración cargada"
        );

        if (config.agentToken) {

            console.log(
                "✅ Agente identificado"
            );

            console.log(
                `🔑 Token: ${config.agentToken}`
            );

            iniciarHeartbeat();

            console.log(
                `✅ Heartbeat iniciado (${config.heartbeatIntervalMs} ms)`
            );

            iniciarMetricas();

            console.log(
                `✅ Recolección de métricas iniciada (${config.statsIntervalMs} ms)`
            );

            console.log("");
            console.log(
                "🟢 ServerHub Agent operativo"
            );
            console.log("");

            return;
        }

        console.log(
            "⚠️ Agente no registrado"
        );

        const resultado = await registerAgent(
            "SHUB-9262-B556"
        );

        console.log(
            "✅ Agente registrado"
        );

        console.log(resultado);

        iniciarHeartbeat();

        console.log(
            `✅ Heartbeat iniciado (${config.heartbeatIntervalMs} ms)`
        );

        iniciarMetricas();

        console.log(
            `✅ Recolección de métricas iniciada (${config.statsIntervalMs} ms)`
        );

        console.log("");
        console.log(
            "🟢 ServerHub Agent operativo"
        );
        console.log("");

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