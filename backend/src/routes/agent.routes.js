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
    registerAgent,
    heartbeat,
    saveStats,
    saveSystemInfo,
    refreshToken,
    getTokenInfo
} = require("../controllers/agent.controller");

router.post(
    "/register",
    registerAgent
);

router.post(
    "/heartbeat",
    authenticateAgent,
    heartbeatLimit,
    heartbeat
);

router.post(
    "/stats",
    authenticateAgent,
    statsLimit,
    saveStats
);

router.post(
    "/system-info",
    authenticateAgent,
    systemInfoLimit,
    saveSystemInfo
);

router.post(
    "/refresh-token",
    authenticateAgent,
    refreshLimit,
    refreshToken
);

router.post(
    "/token-info",
    authenticateAgent,
    getTokenInfo
);

module.exports = router;