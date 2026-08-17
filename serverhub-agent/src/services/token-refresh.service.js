const axios = require("axios");
const fs = require("fs");
const path = require("path");

const config = require("../config/config.json");
const { generarFirma } = require("../utils/signature");
const { generarNonce } = require("../utils/nonce");

const configPath = path.join(
    __dirname,
    "../config/config.json"
);

async function renovarToken() {

    const payload = {
        timestamp: Date.now(),
        nonce: generarNonce()
    };

    const firma = generarFirma(
        JSON.stringify(payload),
        config.agentSecret
    );

    console.log(
    "🔄 Iniciando renovación de token..."
);

    const response = await axios.post(
        `${config.apiUrl}/api/agent/refresh-token`,
        payload,
        {
            headers: {
                "X-Agent-Token":
                    config.agentToken,
                "X-Agent-Signature":
                    firma
            }
        }
    );

    config.agentToken =
        response.data.agentToken;

    config.agentSecret =
        response.data.agentSecret;

    fs.writeFileSync(
        configPath,
        JSON.stringify(
            config,
            null,
            4
        )
    );

    console.log(
        "🔄 Token renovado correctamente"
    );

    return response.data;
}

module.exports = {
    renovarToken
};