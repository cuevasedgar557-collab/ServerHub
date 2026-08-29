const axios = require("axios");


const config = require("../config/config.json");
const { generarFirma } = require("../utils/signature");
const { generarNonce } = require("../utils/nonce");
const {
    loadCredentials,
    saveCredentials
} = require("./credentials.service");


async function renovarToken() {
    const credentials =
    loadCredentials();

    const payload = {
        timestamp: Date.now(),
        nonce: generarNonce()
    };

    const firma = generarFirma(
        JSON.stringify(payload),
        credentials.agentSecret
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
                    credentials.agentToken,
                "X-Agent-Signature":
                    firma
            }
        }
    );

        saveCredentials(
    response.data.agentToken,
    response.data.agentSecret
);

    console.log(
        "🔄 Token renovado correctamente"
    );

    return response.data;
}

module.exports = {
    renovarToken
};