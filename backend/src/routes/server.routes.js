const express = require("express");

const router = express.Router();

const {
    getHealth,
    getServerInfo
} = require("../controllers/server.controller");

router.get("/health", getHealth);

router.get("/info", getServerInfo);

module.exports = router;