const express = require("express");

const router = express.Router();

const {
    registerAgent,
    heartbeat,
    saveStats
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

module.exports = router;