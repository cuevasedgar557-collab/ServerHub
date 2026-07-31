const express = require("express");

const router = express.Router();

const {
    authenticate
} = require("../middlewares/auth.middleware");

const {
    createKey,
    getKeys
} = require("../controllers/registration-key.controller");

router.post(
    "/",
    authenticate,
    createKey
);

router.get(
    "/",
    authenticate,
    getKeys
);

module.exports = router;