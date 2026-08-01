const pool = require("../config/db");

async function getHealth(req, res) {

    try {

        await pool.query("SELECT NOW()");

        res.json({
            success: true,
            status: "ok",
            database: "connected"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            status: "error",
            database: "disconnected"
        });

    }
}

module.exports = {
    getHealth
};