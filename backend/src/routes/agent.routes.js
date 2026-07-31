const express = require("express");

const router = express.Router();

const {
    registerAgent,
    heartbeat
} = require("../controllers/agent.controller");

router.post(
    "/register",
    registerAgent
);
router.post(
    "/heartbeat",
    heartbeat
);

module.exports = router;