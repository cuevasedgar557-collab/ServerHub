const express = require("express");

const router = express.Router();

const {
    authenticate
} = require(
    "../middlewares/auth.middleware"
);

const {
    authenticateAgent
} = require(
    "../middlewares/agent-auth.middleware"
);

const {
    getPendingCommand,
    completeCommand,
    downloadCommandFile
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


router.get(
    "/download/:id",
    authenticate,
    downloadCommandFile
);
module.exports = router;