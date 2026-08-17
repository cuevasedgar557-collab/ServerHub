const Joi = require("joi");

const systemInfoSchema = Joi.object({

    hostname: Joi.string()
        .max(255)
        .required(),

    operatingSystem: Joi.string()
        .max(255)
        .required(),

    architecture: Joi.string()
        .max(100)
        .required(),

    version: Joi.string()
        .max(50)
        .required(),

    timestamp: Joi.number()
        .required(),

    nonce: Joi.string()
        .required()

});

module.exports = {
    systemInfoSchema
};