const express = require("express");

const router = express.Router();

const {
    authenticateAgent
} = require(
    "../middlewares/agent-auth.middleware"
);

const {
    getPendingCommand,
    completeCommand,
    createCommand
} = require(
    "../controllers/command.controller"
);

router.post(
    "/create",
    createCommand
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