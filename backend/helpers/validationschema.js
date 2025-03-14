const Joi = require("joi");

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().min(6).trim().required()
});

module.exports = { authSchema };