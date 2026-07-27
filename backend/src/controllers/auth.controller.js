const authService = require("../services/auth.service");

async function register(req, res) {
    try {
        const user = await authService.register(req.body);

        res.status(201).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
}

async function login(req, res) {
    try {

        const result = await authService.login(req.body);

        res.status(200).json({
            success: true,
            ...result
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });

    }
}

async function profile(req, res) {

    res.json({
        success: true,
        user: req.user
    });

}

module.exports = {
    register,
    login,
    profile
};