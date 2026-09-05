const {
    validateAdminSession
} = require(
    "../services/admin-session.service"
);

async function requireAdminSession(
    req,
    res,
    next
) {

    try {

        const token =
            req.headers[
                "x-admin-session"
            ];

        if (!token) {

            return res.status(401).json({
                success: false,
                message:
                    "Sesión administrativa requerida"
            });

        }

        const session =
            await validateAdminSession(
                req.user.id,
                req.params.id,
                token
            );

        if (!session) {

            return res.status(401).json({
                success: false,
                message:
                    "Sesión administrativa inválida o expirada"
            });

        }

        req.adminSession =
            session;

        next();

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                error.message
        });

    }

}

module.exports = {
    requireAdminSession
};