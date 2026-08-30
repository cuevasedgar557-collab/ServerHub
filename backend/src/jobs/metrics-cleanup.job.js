const cron = require("node-cron");

const {
    cleanupOldMetrics
} = require(
    "../services/metrics-cleanup.service"
);

function startMetricsCleanupJob() {

    cron.schedule(
        "0 3 * * *",
        async () => {

            try {

                const deleted =
                    await cleanupOldMetrics();

                console.log(
                    `🧹 Métricas eliminadas: ${deleted}`
                );

            } catch (error) {

                console.error(
                    "❌ Error limpiando métricas",
                    error
                );

            }

        }
    );

}

module.exports = {
    startMetricsCleanupJob
};