const requests = new Map();

function createAgentRateLimit(
    windowMs
) {

    return (req, res, next) => {

        const agentId =
            req.agent.id;

        const now =
            Date.now();

        const key =
    `${agentId}:${req.path}`;

const lastRequest =
    requests.get(key);

        if (
            lastRequest &&
            now - lastRequest < windowMs
        ) {

            return res.status(429).json({
                success: false,
                message:
                    "Demasiadas solicitudes"
            });

        }

        requests.set(
    key,
    now
);

        next();

    };

}

module.exports = {
    createAgentRateLimit
};