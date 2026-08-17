const crypto = require("crypto");
const pool = require("../config/db");
const {
    isNonceUsed,
    saveNonce
} = require(
    "../utils/nonce-store"
);

async function authenticateAgent(
    req,
    res,
    next
) {
    try {

        const agentToken =
            req.header("X-Agent-Token");

        const signature =
            req.header("X-Agent-Signature");

        if (
            !agentToken ||
            !signature
        ) {
            return res.status(401).json({
                success: false,
                message:
                    "Credenciales del agente requeridas"
            });
        }

        const result =
            await pool.query(
                `
                SELECT *
                FROM agents
                WHERE agent_token = $1
                `,
                [agentToken]
            );

        const agent = result.rows[0];

        if (!agent) {

            return res.status(401).json({
                success: false,
                message:
                    "Agent token inválido"
            });

        }

        const payload =
            JSON.stringify(req.body);

        const expectedSignature =
            crypto
                .createHmac(
                    "sha256",
                    agent.agent_secret
                )
                .update(payload)
                .digest("hex");

        if (
            signature !==
            expectedSignature
        ) {
            return res.status(401).json({
                success: false,
                message:
                    "Firma inválida"
            });
        }
        const timestamp = req.body.timestamp;

if (
    typeof timestamp !== "number"
) {
    return res.status(401).json({
        success: false,
        message: "Timestamp requerido"
    });
}

const now = Date.now();

const maxDifference = 30000;

const difference = Math.abs(
    now - timestamp
);

if (difference > maxDifference) {

    return res.status(401).json({
        success: false,
        message: "Petición expirada"
    });

}

const nonce = req.body.nonce;

if (
    typeof nonce !== "string"
) {
    return res.status(401).json({
        success: false,
        message: "Nonce requerido"
    });
}

if (isNonceUsed(nonce)) {

    return res.status(401).json({
        success: false,
        message: "Petición duplicada"
    });

}

saveNonce(nonce);

req.agent = agent;

next();

    } catch (error) {

        return res.status(500).json({
            success: false,
            message:
                "Error validando agente"
        });

    }
}

module.exports = {
    authenticateAgent
};