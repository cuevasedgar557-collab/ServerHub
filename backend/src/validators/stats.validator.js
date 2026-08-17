const Joi = require("joi");

const statsSchema = Joi.object({

    cpu: Joi.number()
        .min(0)
        .max(100)
        .required(),

    ram: Joi.number()
        .min(0)
        .max(100)
        .required(),

    disk: Joi.number()
        .min(0)
        .max(100)
        .required(),

    timestamp: Joi.number()
        .required(),

    nonce: Joi.string()
        .required()

});

module.exports = {
    statsSchema
};