const express =
    require("express");

const router =
    express.Router();

const {
    authenticate
} = require(
    "../middlewares/auth.middleware"
);

const {
    getAlerts,
    getActiveAlerts
} = require(
    "../controllers/alert.controller"
);

router.get(
    "/",
    authenticate,
    getAlerts
);

router.get(
    "/active",
    authenticate,
    getActiveAlerts
);
module.exports = router;