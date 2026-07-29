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

module.exports = {
    createServer,
    getServers
};