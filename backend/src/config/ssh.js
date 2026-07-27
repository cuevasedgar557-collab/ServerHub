const {
    SSH_HOST,
    SSH_PORT,
    SSH_USER,
    SSH_PASSWORD
} = require("./env");

module.exports = {
    host: SSH_HOST,
    port: Number(SSH_PORT),
    username: SSH_USER,
    password: SSH_PASSWORD
};