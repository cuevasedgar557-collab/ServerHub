const crypto = require("crypto");
const pool = require("../config/db");

async function registerAgent(data) {

    const {
        registrationKey,
        serverId,
        version
    } = data;

    const keyResult = await pool.query(
        `
        SELECT *
        FROM registration_keys
        WHERE registration_key = $1
        `,
        [registrationKey]
    );

    const key = keyResult.rows[0];

    if (!key) {
        throw new Error("Clave inválida");
    }

    if (key.is_used) {
        throw new Error("Clave ya utilizada");
    }

    if (new Date(key.expires_at) < new Date()) {
        throw new Error("Clave expirada");
    }

    const agentToken =
        "agt_" +
        crypto.randomBytes(16).toString("hex");

    const agentResult = await pool.query(
        `
        INSERT INTO agents
        (
            server_id,
            agent_token,
            version
        )
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [
            serverId,
            agentToken,
            version || "1.0.0"
        ]
    );

    await pool.query(
        `
        UPDATE registration_keys
        SET is_used = true
        WHERE id = $1
        `,
        [key.id]
    );

    return {
        agentId: agentResult.rows[0].id,
        agentToken
    };
}

module.exports = {
    registerAgent
};
