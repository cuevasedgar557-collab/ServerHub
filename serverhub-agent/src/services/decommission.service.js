const fs = require("fs");
const path = require("path");

const configPath = path.join(
    __dirname,
    "../config/config.json"
);

function decommissionAgent() {

    const config = JSON.parse(
        fs.readFileSync(
            configPath,
            "utf8"
        )
    );

    config.agentToken = "";
    config.agentSecret = "";

    fs.writeFileSync(
        configPath,
        JSON.stringify(
            config,
            null,
            4
        )
    );

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