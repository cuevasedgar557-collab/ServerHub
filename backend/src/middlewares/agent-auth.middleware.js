const crypto = require("crypto");
const pool = require("../config/db");

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