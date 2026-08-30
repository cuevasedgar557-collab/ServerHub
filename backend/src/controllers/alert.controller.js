const alertService =
    require("../services/alert.service");

async function getAlerts(
    req,
    res
) {

    try {

        const alerts =
            await alertService.getAlerts(
                req.user.id
            );

        res.json({
            success: true,
            alerts
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

async function getActiveAlerts(
    req,
    res
) {

    try {

        const alerts =
            await alertService.getActiveAlerts(
                req.user.id
            );

        res.json({
            success: true,
            alerts
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

module.exports = {
    getAlerts,
    getActiveAlerts
};