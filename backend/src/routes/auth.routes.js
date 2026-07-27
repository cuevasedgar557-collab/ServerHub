const express = require("express");
const {
    authenticate
} = require("../middlewares/auth.middleware");

const {
    register,
    login,
    profile
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authenticate, profile);

module.exports = router;