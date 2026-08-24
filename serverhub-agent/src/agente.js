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

const {
    obtenerInformacionSistema
} = require("./services/system.service");

const {
    enviarInformacionSistema
} = require(
    "./services/system-info.service"
);

const {
    iniciarMonitorToken
} = require(
    "./services/token-monitor.service"
);

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

        const sistema =
            obtenerInformacionSistema(
                config.version
            );

        console.log(
            `💻 Equipo: ${sistema.hostname}`
        );

        console.log(
            `🖥️ Sistema: ${sistema.plataforma}`
        );

        console.log(
            `⚙️ Arquitectura: ${sistema.arquitectura}`
        );

        console.log(
            `⏱️ Tiempo encendido: ${sistema.tiempoEncendido}`
        );

        if (config.agentToken) {

            console.log(
                "✅ Agente identificado"
            );

            console.log(
                `🔑 Token: ${config.agentToken}`
            );

            await enviarInformacionSistema();

            iniciarMonitorToken();

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

        const registrationKey =
            process.argv[2];

        if (!registrationKey) {

            console.log("");

            console.log(
                "❌ Debe proporcionar una Registration Key"
            );

            console.log("");

            console.log(
                "Uso:"
            );

            console.log(
                "node src/index.js SHUB-XXXX-XXXX"
            );

            console.log("");

            return;

        }

        const resultado =
            await registerAgent(
                registrationKey
            );

        console.log(
            "✅ Agente registrado"
        );

        console.log(
            resultado
        );

        await enviarInformacionSistema();

        iniciarMonitorToken();

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
            error.response?.data ||
            error.message
        );

    }

}

module.exports = {
    iniciarAgente
};