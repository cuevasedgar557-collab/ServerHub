const express = require("express");

const router = express.Router();
const {
    authenticate
} = require("../middlewares/auth.middleware");

const {
    getHealth,
    getServerInfo,
    createServer,
    getServers,
    getServerById,
    updateServer,
    deleteServer,
    getServerMetrics,
    getLatestMetrics,
    getServerAgent,
    verifyServerPassword
} = require("../controllers/server.controller");

router.get("/health", getHealth);

router.get("/info", getServerInfo);

router.post("/", authenticate, createServer);

router.get("/", authenticate, getServers);

router.get(
    "/:id/metrics",
    authenticate,
    getServerMetrics
);

router.get(
    "/:id/latest",
    authenticate,
    getLatestMetrics
);

router.get(
    "/:id/agent",
    authenticate,
    getServerAgent
);

router.get("/:id", authenticate, getServerById);

router.put("/:id", authenticate, updateServer);

router.delete("/:id", authenticate, deleteServer);


router.post(
    "/:id/verify-password",
    authenticate,
    verifyServerPassword
);


module.exports = router;