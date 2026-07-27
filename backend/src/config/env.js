require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3000,

    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_PASSWORD: process.env.DB_PASSWORD,

    SSH_HOST: process.env.SSH_HOST,
    SSH_PORT: process.env.SSH_PORT,
    SSH_USER: process.env.SSH_USER,
    SSH_PASSWORD: process.env.SSH_PASSWORD
};