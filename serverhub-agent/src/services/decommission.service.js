const {
    clearCredentials
} = require(
    "./credentials.service"
);

function decommissionAgent() {

    clearCredentials();

    console.log("");

    console.log(
        "⚠️ Agente dado de baja"
    );

    console.log(
        "⚠️ Credenciales eliminadas"
    );

    console.log(
        "⚠️ Reinicie el agente para registrarlo nuevamente"
    );

    console.log("");

    process.exit(0);
}

module.exports = {
    decommissionAgent
};