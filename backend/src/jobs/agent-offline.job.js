const cron = require("node-cron");

const {
    checkOfflineAgents
} = require(
    "../services/alert.service"
);

function startAgentOfflineJob() {

    cron.schedule(
        "*/5 * * * *",
        async () => {

            try {

                await checkOfflineAgents();

            } catch (error) {

                console.error(
                    "Error verificando agentes offline",
                    error
                );

            }

        }
    );

}

module.exports = {
    startAgentOfflineJob
};