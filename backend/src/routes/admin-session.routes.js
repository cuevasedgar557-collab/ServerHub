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
    createServerAdminSession,
    logoutAdminSession
} = require(
    "../controllers/admin-session.controller"
);

router.post(
    "/:id/admin-session",
    authenticate,
    createServerAdminSession
);

router.post(
    "/:id/admin-session/logout",
    authenticate,
    logoutAdminSession
);

module.exports = router;