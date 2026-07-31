const registrationKeyService =
    require("../services/registration-key.service");

async function createKey(req, res) {

    try {

        const key =
            await registrationKeyService.createKey(
                req.user.id
            );

        res.status(201).json({
            success: true,
            key
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

async function getKeys(req, res) {

    try {

        const keys =
            await registrationKeyService.getKeys(
                req.user.id
            );

        res.json({
            success: true,
            keys
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

module.exports = {
    createKey,
    getKeys
};