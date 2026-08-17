const Joi = require("joi");

const heartbeatSchema = Joi.object({

    timestamp: Joi.number()
        .required(),

    nonce: Joi.string()
        .required()

});

module.exports = {
    heartbeatSchema
};
