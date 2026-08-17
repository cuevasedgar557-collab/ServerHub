const crypto = require("crypto");

function generarNonce() {

    return crypto
        .randomBytes(16)
        .toString("hex");

}

module.exports = {
    generarNonce
};