const Joi = require("joi");

const registerSchema = Joi.object({

    registrationKey: Joi.string()
        .required(),

    version: Joi.string()
        .max(50)
        .required(),

    hostname: Joi.string()
        .max(255)
        .required(),

    operatingSystem: Joi.string()
        .max(255)
        .required(),

    architecture: Joi.string()
        .max(100)
        .required()

});

module.exports = {
    registerSchema
};