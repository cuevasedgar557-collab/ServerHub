const express = require("express");

const router = express.Router();

const {
    authenticateAgent
} = require(
    "../middlewares/agent-auth.middleware"
);

const {
    getPendingCommand,
    completeCommand
} = require(
    "../controllers/command.controller"
);

router.post(
    "/pending",
    authenticateAgent,
    getPendingCommand
);

router.post(
    "/complete",
    authenticateAgent,
    completeCommand
);

module.exports = router;