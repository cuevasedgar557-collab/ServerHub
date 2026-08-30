const pool = require("../config/db");

async function cleanupOldMetrics() {

    const result = await pool.query(
        `
        DELETE FROM server_metrics
        WHERE created_at <
        NOW() - INTERVAL '90 days'
        `
    );

    return result.rowCount;
}

module.exports = {
    cleanupOldMetrics
};