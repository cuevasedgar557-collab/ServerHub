const crypto = require("crypto");
const pool = require("../config/db");
const {
    createAuditLog
} = require("./audit.service");

function generateKey() {

    const part1 = crypto.randomBytes(2)
        .toString("hex")
        .toUpperCase();

    const part2 = crypto.randomBytes(2)
        .toString("hex")
        .toUpperCase();

    return `SHUB-${part1}-${part2}`;
}

async function createKey(userId, serverId) {

    const registrationKey = generateKey();

    const expiresAt = new Date();

    expiresAt.setDate(
        expiresAt.getDate() + 1
    );

    const result = await pool.query(
        `
        INSERT INTO registration_keys
        (
            user_id,
            server_id,
            registration_key,
            expires_at
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
            userId,
            serverId,
            registrationKey,
            expiresAt
        ]
    );

    await createAuditLog(
    "REGISTRATION_KEY_CREATED",
    {
        registrationKey,
        serverId,
        expiresAt
    }
);

    return result.rows[0];
}

async function getKeys(userId) {

    const result = await pool.query(
        `
        SELECT *
        FROM registration_keys
        WHERE user_id = $1
        ORDER BY id DESC
        `,
        [userId]
    );

    return result.rows;
}

module.exports = {
    createKey,
    getKeys
};