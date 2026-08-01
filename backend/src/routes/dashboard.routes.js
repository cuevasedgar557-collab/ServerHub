const express = require("express");

const router = express.Router();

const {
    authenticate
} = require("../middlewares/auth.middleware");

const {
    getDashboard
} = require("../controllers/dashboard.controller");

router.get(
    "/",
    authenticate,
    getDashboard
);

module.exports = router;