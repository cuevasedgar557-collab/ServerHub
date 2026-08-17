const express = require("express");

const router = express.Router();
const {
    authenticateAgent
} = require(
    "../middlewares/agent-auth.middleware"
);

const {
    registerAgent,
    heartbeat,
    saveStats,
    saveSystemInfo
} = require("../controllers/agent.controller");

router.post(
    "/register",
    registerAgent
);

router.post(
    "/heartbeat",
    authenticateAgent,
    heartbeat
);

router.post(
    "/stats",
    authenticateAgent,
    saveStats
);

router.post(
    "/system-info",
    authenticateAgent,
    saveSystemInfo
);

module.exports = router;