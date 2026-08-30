const logger = require("../utils/logger");

const {
    clearCredentials
} = require(
    "./credentials.service"
);

function decommissionAgent() {

    clearCredentials();

    logger.info("");

    logger.info(
        "⚠️ Agente dado de baja"
    );

    logger.info(
        "⚠️ Credenciales eliminadas"
    );

    logger.info(
        "⚠️ Reinicie el agente para registrarlo nuevamente"
    );

    logger.info("");

    process.exit(0);
}

module.exports = {
    decommissionAgent
};