const axios = require("axios");
const si = require("systeminformation");

const config = require("../config/config.json");
const { generarFirma } =
    require("../utils/signature");

const {
    generarNonce
} = require(
    "../utils/nonce"
);
const {
    decommissionAgent
} = require(
    "./decommission.service"
);

const {
    loadCredentials
} = require(
    "./credentials.service"
);

async function obtenerMetricas() {

    const cargaCpu = await si.currentLoad();

    const memoria = await si.mem();

    const discos = await si.fsSize();

    const cpu = Number(
        cargaCpu.currentLoad.toFixed(2)
    );

    const ram = Number(
        (
            (memoria.used / memoria.total) * 100
        ).toFixed(2)
    );

    const disk = Number(
        discos[0]?.use?.toFixed(2) || 0
    );

    return {
        cpu,
        ram,
        disk
    };
}

async function enviarMetricas() {

    try {
        const credentials =
    loadCredentials();

        const metricas =
            await obtenerMetricas();

        const payload = {
    ...metricas,
    timestamp: Date.now(),
    nonce: generarNonce()
};

const firma = generarFirma(
    JSON.stringify(payload),
    credentials.agentSecret
);

await axios.post(
    `${config.apiUrl}/api/agent/stats`,
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

        console.log(
            "📊 Métricas enviadas",
            metricas
        );

    } catch (error) {

        console.error(
            "❌ Error enviando métricas:",
            error.response?.data ||
            error.message
        );

        const response =
    error.response?.data;

if (
    response?.message ===
    "Agent token inválido"
) {

    decommissionAgent();

}

    }

}

function iniciarMetricas() {

    const intervalo =
        config.statsIntervalMs || 300000;

    enviarMetricas();

    setInterval(
        enviarMetricas,
        intervalo
    );

}

module.exports = {
    iniciarMetricas
};