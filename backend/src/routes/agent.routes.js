const express = require("express");

const router = express.Router();

const {
    registerAgent
} = require("../controllers/agent.controller");

router.post(
    "/register",
    registerAgent
);

module.exports = router;