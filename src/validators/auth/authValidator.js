const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string().min(8)
        .required()
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required()
});

const resetPasswordSchema = Joi.object({
    password: Joi.string().min(8).required()
});

module.exports = {loginSchema, forgotPasswordSchema, resetPasswordSchema};