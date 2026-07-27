const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/env");

function authenticate(req, res, next) {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token requerido"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Token inválido"
        });

    }
}

module.exports = {
    authenticate
};