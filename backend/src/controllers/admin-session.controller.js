const {
    createAdminSession,
    deleteAdminSession
} = require(
    "../services/admin-session.service"
);

const serverService =
    require("../services/server.service");

async function createServerAdminSession(
    req,
    res
) {

    try {

        const valid =
            await serverService
                .verifyServerPassword(
                    req.user.id,
                    req.params.id,
                    req.body.password
                );

        if (!valid) {

            return res.status(401).json({
                success: false,
                message:
                    "Contraseña administrativa incorrecta"
            });

        }

        const session =
            await createAdminSession(
                req.user.id,
                req.params.id
            );

        res.json({
            success: true,
            token: session.token,
            expiresAt:
                session.expires_at
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

async function logoutAdminSession(
    req,
    res
) {

    try {

        await deleteAdminSession(
            req.body.token
        );

        res.json({
            success: true
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

module.exports = {
    createServerAdminSession,
    logoutAdminSession
};