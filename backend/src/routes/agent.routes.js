const express = require("express");

const router = express.Router();

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
    heartbeat
);

router.post(
    "/stats",
    saveStats
);

router.post(
    "/system-info",
    saveSystemInfo
);

module.exports = router;