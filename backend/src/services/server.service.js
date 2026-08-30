const pool = require("../config/db");

const bcrypt = require("bcrypt");

const {
    createAuditLog
} = require("./audit.service");

async function createServer(userId, data) {

    const {
        name,
        description,
        adminPassword
    } = data;

    if (!name) {
        throw new Error(
            "El nombre del servidor es obligatorio"
        );
    }

    if (!adminPassword) {
        throw new Error(
            "La clave administrativa es obligatoria"
        );
    }

    const passwordHash =
        await bcrypt.hash(
            adminPassword,
            12
        );

    const result = await pool.query(
        `
        INSERT INTO servers
        (
            user_id,
            name,
            description,
            admin_password_hash
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
            userId,
            name,
            description,
            passwordHash
        ]
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

    const {
        admin_password_hash,
        ...safeServer
    } = result.rows[0];

    return safeServer;

}
async function getServers(
    userId,
    page = 1,
    limit = 50
) {
    const offset =
    (page - 1) * limit;

const result = await pool.query(
    `
    SELECT
        s.id,
        s.user_id,
        s.name,
        s.description,
        s.status,
        s.created_at,
        s.updated_at,
        a.last_seen
    FROM servers s
    LEFT JOIN agents a
        ON a.server_id = s.id
    WHERE s.user_id = $1
    ORDER BY s.id ASC
    LIMIT $2
    OFFSET $3
    `,
    [
        userId,
        limit,
        offset
    ]
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

async function getServerById(
    userId,
    serverId
) {

    const result = await pool.query(
        `
        SELECT
            id,
            user_id,
            name,
            description,
            status,
            created_at,
            updated_at
        FROM servers
        WHERE id = $1
        AND user_id = $2
        `,
        [
            serverId,
            userId
        ]
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

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const serverResult =
            await client.query(
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

        await client.query(
            `
            DELETE FROM agents
            WHERE server_id = $1
            `,
            [serverId]
        );

        await client.query(
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
            },
            client
        );

        await client.query("COMMIT");

        return server;

    } catch (error) {

        await client.query("ROLLBACK");

        throw error;

    } finally {

        client.release();

    }
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

async function verifyServerPassword(
    userId,
    serverId,
    password
) {

    const result = await pool.query(
        `
        SELECT
            admin_password_hash
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
        result.rows[0];

    if (!server) {

        throw new Error(
            "Servidor no encontrado"
        );

    }

    const valid =
        await bcrypt.compare(
            password,
            server.admin_password_hash
        );

    return valid;

}

module.exports = {
    createServer,
    getServers,
    getServerById,
    updateServer,
    deleteServer,
    getServerMetrics,
    getLatestMetrics,
    getServerAgent,
    verifyServerPassword
};
