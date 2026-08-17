const Joi = require("joi");

const refreshTokenSchema = Joi.object({

    timestamp: Joi.number()
        .required(),

    nonce: Joi.string()
        .required()

});

module.exports = {
    refreshTokenSchema
};