const axios = require("axios");
const si = require("systeminformation");

const config = require("../config/config.json");

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

        const metricas =
            await obtenerMetricas();

        await axios.post(
            `${config.apiUrl}/api/agent/stats`,
            {
                agentToken:
                    config.agentToken,

                ...metricas
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