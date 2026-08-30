const pool = require("../config/db");

async function getDashboard(userId) {

    const serversResult = await pool.query(
        `
        SELECT
            s.id,
            a.last_seen
        FROM servers s
        LEFT JOIN agents a
            ON a.server_id = s.id
        WHERE s.user_id = $1
        `,
        [userId]
    );

    const servers = serversResult.rows;

    let onlineServers = 0;
    let offlineServers = 0;

    const twoMinutes = 2 * 60 * 1000;

    for (const server of servers) {

        if (!server.last_seen) {

            offlineServers++;
            continue;

        }

        const diff =
            Date.now() -
            new Date(server.last_seen).getTime();

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

    const metricsResult = await pool.query(
        `
        SELECT
            AVG(cpu_usage) AS avg_cpu,
            AVG(ram_usage) AS avg_ram,
            AVG(disk_usage) AS avg_disk
        FROM server_metrics sm
        INNER JOIN agents a
            ON a.id = sm.agent_id
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
        ),

        avgCpu: Number(
            Number(
                metricsResult.rows[0].avg_cpu || 0
            ).toFixed(2)
        ),

        avgRam: Number(
            Number(
                metricsResult.rows[0].avg_ram || 0
            ).toFixed(2)
        ),

        avgDisk: Number(
            Number(
                metricsResult.rows[0].avg_disk || 0
            ).toFixed(2)
        )
    };
}

module.exports = {
    getDashboard
};