const pool = require("../config/db");

const {
    createAuditLog
} = require("./audit.service");

async function createServer(userId, data) {

    const { name, description } = data;

    if (!name) {
        throw new Error("El nombre del servidor es obligatorio");
    }

    const result = await pool.query(
        `
        INSERT INTO servers
        (user_id, name, description)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [userId, name, description]
    );

    await createAuditLog(
    "SERVER_CREATED",
    {
        serverId:
            result.rows[0].id,

        userId,

        name,

        description
    }
);

    return result.rows[0];
}

async function getServers(userId) {

    const result = await pool.query(
        `
        SELECT
            s.*,
            a.last_seen
        FROM servers s
        LEFT JOIN agents a
            ON a.server_id = s.id
        WHERE s.user_id = $1
        ORDER BY s.id ASC
        `,
        [userId]
    );

    return result.rows.map(server => {

        let connectionStatus = "offline";

        if (server.last_seen) {

            const diff =
                Date.now() -
                new Date(server.last_seen).getTime();

            const twoMinutes = 2 * 60 * 1000;

            if (diff <= twoMinutes) {
                connectionStatus = "online";
            }

        }

        return {
            ...server,
            connectionStatus
        };
    });
}

async function getServerById(userId, serverId) {

    const result = await pool.query(
        `
        SELECT *
        FROM servers
        WHERE id = $1
        AND user_id = $2
        `,
        [serverId, userId]
    );

    return result.rows[0];
}

async function updateServer(userId, serverId, data) {

    const { name, description, status } = data;

    const result = await pool.query(
        `
        UPDATE servers
        SET
            name = $1,
            description = $2,
            status = $3,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $4
        AND user_id = $5
        RETURNING *
        `,
        [
            name,
            description,
            status,
            serverId,
            userId
        ]
    );

    return result.rows[0];
}

async function deleteServer(
    userId,
    serverId
) {

    const serverResult =
        await pool.query(
            `
            SELECT *
            FROM servers
            WHERE id = $1
            AND user_id = $2
            `,
            [
                serverId,
                userId
            ]
        );

    const server =
        serverResult.rows[0];

    if (!server) {

        throw new Error(
            "Servidor no encontrado"
        );

    }

    await pool.query(
        `
        DELETE FROM agents
        WHERE server_id = $1
        `,
        [serverId]
    );

    await pool.query(
        `
        DELETE FROM servers
        WHERE id = $1
        AND user_id = $2
        `,
        [
            serverId,
            userId
        ]
    );

    await createAuditLog(
        "SERVER_DELETED",
        {
            serverId,
            userId,
            name: server.name
        }
    );

    return server;

}

async function getServerMetrics(userId, serverId) {

    const serverResult = await pool.query(
        `
        SELECT id
        FROM servers
        WHERE id = $1
        AND user_id = $2
        `,
        [serverId, userId]
    );

    const server = serverResult.rows[0];

    if (!server) {
        throw new Error("Servidor no encontrado");
    }

    const metricsResult = await pool.query(
        `
        SELECT
            cpu_usage,
            ram_usage,
            disk_usage,
            created_at
        FROM server_metrics
        WHERE agent_id IN (
            SELECT id
            FROM agents
            WHERE server_id = $1
        )
        ORDER BY created_at DESC
        LIMIT 100
        `,
        [serverId]
    );

    return metricsResult.rows;
}

async function getLatestMetrics(userId, serverId) {

    const serverResult = await pool.query(
        `
        SELECT
            s.id,
            s.name,
            a.id AS agent_id,
            a.last_seen
        FROM servers s
        LEFT JOIN agents a
            ON a.server_id = s.id
        WHERE s.id = $1
        AND s.user_id = $2
        `,
        [serverId, userId]
    );

    const server = serverResult.rows[0];

    if (!server) {
        throw new Error("Servidor no encontrado");
    }

    const metricsResult = await pool.query(
        `
        SELECT
            cpu_usage,
            ram_usage,
            disk_usage,
            created_at
        FROM server_metrics
        WHERE agent_id = $1
        ORDER BY created_at DESC
        LIMIT 1
        `,
        [server.agent_id]
    );

    const metrics = metricsResult.rows[0];

    let connectionStatus = "offline";

    if (server.last_seen) {

        const diff =
            Date.now() -
            new Date(server.last_seen).getTime();

        const twoMinutes = 2 * 60 * 1000;

        if (diff <= twoMinutes) {
            connectionStatus = "online";
        }

    }

    return {
        serverId: server.id,
        serverName: server.name,
        connectionStatus,
        metrics: metrics || null
    };
}

async function getServerAgent(userId, serverId) {

    const result = await pool.query(
        `
        SELECT
            a.id,
            a.version,
            a.last_seen
        FROM agents a
        INNER JOIN servers s
            ON s.id = a.server_id
        WHERE s.id = $1
        AND s.user_id = $2
        `,
        [serverId, userId]
    );

    const agent = result.rows[0];

    if (!agent) {
        throw new Error(
            "Agente no encontrado"
        );
    }

    let connectionStatus = "offline";

    if (agent.last_seen) {

        const diff =
            Date.now() -
            new Date(agent.last_seen).getTime();

        if (diff <= 120000) {
            connectionStatus = "online";
        }
    }

    return {
        ...agent,
        connectionStatus
    };
}

module.exports = {
    createServer,
    getServers,
    getServerById,
    updateServer,
    deleteServer,
    getServerMetrics,
    getLatestMetrics,
    getServerAgent
};
