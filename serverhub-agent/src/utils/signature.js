const crypto = require("crypto");

function generarFirma(payload, secret) {
    return crypto
        .createHmac("sha256", secret)
        .update(payload)
        .digest("hex");
}

module.exports = {
    generarFirma
};