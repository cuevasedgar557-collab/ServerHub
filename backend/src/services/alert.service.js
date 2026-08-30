const pool = require("../config/db");

async function createAlert(
    serverId,
    type,
    message
) {

    const existingAlert =
        await pool.query(
            `
            SELECT id
            FROM alerts
            WHERE server_id = $1
            AND type = $2
            AND is_resolved = false
            `,
            [
                serverId,
                type
            ]
        );

    if (
        existingAlert.rows.length > 0
    ) {
        return null;
    }

    const result =
        await pool.query(
            `
            INSERT INTO alerts
            (
                server_id,
                type,
                message
            )
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [
                serverId,
                type,
                message
            ]
        );

    return result.rows[0];
}

async function resolveAlert(
    serverId,
    type
) {

    await pool.query(
        `
        UPDATE alerts
        SET is_resolved = true
        WHERE server_id = $1
        AND type = $2
        AND is_resolved = false
        `,
        [
            serverId,
            type
        ]
    );

}

async function getAlerts(
    userId
) {

    const result =
        await pool.query(
            `
            SELECT
                a.*
            FROM alerts a
            INNER JOIN servers s
                ON s.id = a.server_id
            WHERE s.user_id = $1
            ORDER BY a.created_at DESC
            `,
            [userId]
        );

    return result.rows;
}


async function checkOfflineAgents() {

    const result = await pool.query(
        `
        SELECT
            a.id,
            a.server_id,
            a.last_seen
        FROM agents a
        `
    );

    const twoMinutes =
        2 * 60 * 1000;

    for (const agent of result.rows) {

        if (!agent.last_seen) {
            continue;
        }

        const diff =
            Date.now() -
            new Date(
                agent.last_seen
            ).getTime();

        if (diff > twoMinutes) {

            await createAlert(
                agent.server_id,
                "AGENT_OFFLINE",
                "El agente no reporta heartbeat"
            );

        } else {

            await resolveAlert(
                agent.server_id,
                "AGENT_OFFLINE"
            );

        }

    }
}

async function getActiveAlerts(userId) {

    const result =
        await pool.query(
            `
            SELECT
                a.*
            FROM alerts a
            INNER JOIN servers s
                ON s.id = a.server_id
            WHERE s.user_id = $1
            AND a.is_resolved = false
            ORDER BY a.created_at DESC
            `,
            [userId]
        );

    return result.rows;

}

module.exports = {
    createAlert,
    resolveAlert,
    getAlerts,
    checkOfflineAgents,
    getActiveAlerts
};
