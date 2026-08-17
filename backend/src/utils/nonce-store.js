const usedNonces = new Map();

function isNonceUsed(nonce) {
    return usedNonces.has(nonce);
}

function saveNonce(nonce) {

    usedNonces.set(
        nonce,
        Date.now()
    );

    setTimeout(() => {

        usedNonces.delete(nonce);

    }, 30000);

}

module.exports = {
    isNonceUsed,
    saveNonce
};