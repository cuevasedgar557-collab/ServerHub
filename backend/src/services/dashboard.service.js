const pool = require("../config/db");

async function getDashboard(userId) {

    const serversResult = await pool.query(
        `
        SELECT id
        FROM servers
        WHERE user_id = $1
        `,
        [userId]
    );

    const servers = serversResult.rows;

    let onlineServers = 0;
    let offlineServers = 0;

    for (const server of servers) {

        const agentResult = await pool.query(
            `
            SELECT last_seen
            FROM agents
            WHERE server_id = $1
            `,
            [server.id]
        );

        const agent = agentResult.rows[0];

        if (!agent || !agent.last_seen) {

            offlineServers++;
            continue;

        }

        const diff =
            Date.now() -
            new Date(agent.last_seen).getTime();

        const twoMinutes = 2 * 60 * 1000;

        if (diff <= twoMinutes) {
            onlineServers++;
        } else {
            offlineServers++;
        }
    }

    const agentsResult = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM agents a
        INNER JOIN servers s
            ON s.id = a.server_id
        WHERE s.user_id = $1
        `,
        [userId]
    );

    return {
        totalServers: servers.length,
        onlineServers,
        offlineServers,
        totalAgents: Number(
            agentsResult.rows[0].total
        )
    };
}

module.exports = {
    getDashboard
};