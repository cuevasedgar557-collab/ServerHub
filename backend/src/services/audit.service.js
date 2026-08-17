const pool = require("../config/db");

async function createAuditLog(
    eventType,
    details = {}
) {

    await pool.query(
        `
        INSERT INTO audit_logs
        (
            event_type,
            details
        )
        VALUES ($1, $2)
        `,
        [
            eventType,
            details
        ]
    );

}

module.exports = {
    createAuditLog
};