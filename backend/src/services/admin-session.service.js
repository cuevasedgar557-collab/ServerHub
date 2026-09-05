const crypto = require("crypto");

const pool = require("../config/db");

async function createAdminSession(
    userId,
    serverId
) {

    const token =
        crypto.randomBytes(32)
            .toString("hex");

    const expiresAt =
        new Date(
            Date.now() +
            (
                15 * 60 * 1000
            )
        );

    const result =
        await pool.query(
            `
            INSERT INTO admin_sessions
            (
                user_id,
                server_id,
                token,
                expires_at
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4
            )
            RETURNING *
            `,
            [
                userId,
                serverId,
                token,
                expiresAt
            ]
        );

    return result.rows[0];

}

async function validateAdminSession(
    userId,
    serverId,
    token
) {

    const result =
        await pool.query(
            `
            SELECT *
            FROM admin_sessions
            WHERE user_id = $1
            AND server_id = $2
            AND token = $3
            AND expires_at > CURRENT_TIMESTAMP
            `,
            [
                userId,
                serverId,
                token
            ]
        );

    return result.rows[0] || null;

}

async function deleteAdminSession(
    token
) {

    await pool.query(
        `
        DELETE
        FROM admin_sessions
        WHERE token = $1
        `,
        [token]
    );

}

module.exports = {
    createAdminSession,
    validateAdminSession,
    deleteAdminSession
};