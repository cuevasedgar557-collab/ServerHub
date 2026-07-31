const pool = require("../config/db");

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

    return result.rows[0];
}

async function getServers(userId) {

    const result = await pool.query(
        `
        SELECT *
        FROM servers
        WHERE user_id = $1
        ORDER BY id ASC
        `,
        [userId]
    );

    return result.rows;
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

async function deleteServer(userId, serverId) {

    const result = await pool.query(
        `
        DELETE FROM servers
        WHERE id = $1
        AND user_id = $2
        RETURNING *
        `,
        [serverId, userId]
    );

    return result.rows[0];
}



module.exports = {
    createServer,
    getServers,
    getServerById,
    updateServer,
    deleteServer
};
