const config = require("./config/config.json");
const logger = require("./utils/logger");

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

const {
    migrateFromConfig,
    loadCredentials
} = require(
    "./services/credentials.service"
);

async function iniciarAgente() {

    try {

        logger.info("");
        logger.info(
            `🚀 Iniciando ServerHub Agent v${config.version}`
        );
        logger.info("");

        logger.info(
            "✅ Configuración cargada"
        );
        migrateFromConfig(config);
        const credentials =
    loadCredentials();

        const sistema =
            obtenerInformacionSistema(
                config.version
            );

        logger.info(
            `💻 Equipo: ${sistema.hostname}`
        );

        logger.info(
            `🖥️ Sistema: ${sistema.plataforma}`
        );

        logger.info(
            `⚙️ Arquitectura: ${sistema.arquitectura}`
        );

        logger.info(
            `⏱️ Tiempo encendido: ${sistema.tiempoEncendido}`
        );

        if (credentials.agentToken) {

            logger.info(
                "✅ Agente identificado"
            );

            logger.info(
                `🔑 Token: ${credentials.agentToken}`
            );

            await enviarInformacionSistema();

            iniciarMonitorToken();

            iniciarHeartbeat();

            logger.info(
                `✅ Heartbeat iniciado (${config.heartbeatIntervalMs} ms)`
            );

            iniciarMetricas();

            logger.info(
                `✅ Recolección de métricas iniciada (${config.statsIntervalMs} ms)`
            );

            logger.info("");
            logger.info(
                "🟢 ServerHub Agent operativo"
            );
            logger.info("");

            return;

        }

        logger.info(
            "⚠️ Agente no registrado"
        );

        const registrationKey =
            process.argv[2];

        if (!registrationKey) {

            logger.info("");

            logger.info(
                "❌ Debe proporcionar una Registration Key"
            );

            logger.info("");

            logger.info(
                "Uso:"
            );

            logger.info(
                "node src/index.js SHUB-XXXX-XXXX"
            );

            logger.info("");

            return;

        }

        const resultado =
            await registerAgent(
                registrationKey
            );

        logger.info(
            "✅ Agente registrado"
        );

        logger.info(
    JSON.stringify(
        resultado,
        null,
        2
    )
);

        await enviarInformacionSistema();

        iniciarMonitorToken();

        iniciarHeartbeat();

        logger.info(
            `✅ Heartbeat iniciado (${config.heartbeatIntervalMs} ms)`
        );

        iniciarMetricas();

        logger.info(
            `✅ Recolección de métricas iniciada (${config.statsIntervalMs} ms)`
        );

        logger.info("");
        logger.info(
            "🟢 ServerHub Agent operativo"
        );
        logger.info("");

    } catch (error) {

        logger.error(
    `❌ Error: ${
        typeof error.response?.data === "object"
            ? JSON.stringify(error.response.data)
            : error.response?.data || error.message
    }`
);

    }

}

module.exports = {
    iniciarAgente
};