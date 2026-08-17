const express = require("express");

const router = express.Router();
const {
    authenticateAgent
} = require(
    "../middlewares/agent-auth.middleware"
);

const {
    createAgentRateLimit
} = require(
    "../middlewares/agent-rate-limit.middleware"
);

const heartbeatLimit =
    createAgentRateLimit(
        5000
    );

const statsLimit =
    createAgentRateLimit(
        5000
    );

const systemInfoLimit =
    createAgentRateLimit(
        60000
    );

const refreshLimit =
    createAgentRateLimit(
        60 * 60 * 1000
    );


    const {
    validate
} = require(
    "../middlewares/validation.middleware"
);

const {
    statsSchema
} = require(
    "../validators/stats.validator"
);

const {
    heartbeatSchema
} = require(
    "../validators/heartbeat.validator"
);

const {
    systemInfoSchema
} = require(
    "../validators/system-info.validator"
);

const {
    refreshTokenSchema
} = require(
    "../validators/refresh-token.validator"
);

const {
    registerSchema
} = require(
    "../validators/register.validator"
);

const {
    registerAgent,
    heartbeat,
    saveStats,
    saveSystemInfo,
    refreshToken,
    getTokenInfo
} = require("../controllers/agent.controller");

router.post(
    "/register",
    validate(registerSchema),
    registerAgent
);

router.post(
    "/heartbeat",
    authenticateAgent,
    heartbeatLimit,
    validate(heartbeatSchema),
    heartbeat
);


router.post(
    "/stats",
    authenticateAgent,
    statsLimit,
    validate(statsSchema),
    saveStats
);

router.post(
    "/system-info",
    authenticateAgent,
    systemInfoLimit,
    validate(systemInfoSchema),
    saveSystemInfo
);

router.post(
    "/refresh-token",
    authenticateAgent,
    refreshLimit,
    validate(refreshTokenSchema),
    refreshToken
);

router.post(
    "/token-info",
    authenticateAgent,
    validate(refreshTokenSchema),
    getTokenInfo
);

module.exports = router;