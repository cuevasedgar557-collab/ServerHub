const dashboardService =
    require("../services/dashboard.service");

async function getDashboard(req, res) {

    try {

        const dashboard =
            await dashboardService.getDashboard(
                req.user.id
            );

        res.json({
            success: true,
            dashboard
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

module.exports = {
    getDashboard
};