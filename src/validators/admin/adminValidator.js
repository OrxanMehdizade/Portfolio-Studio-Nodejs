const Joi = require('joi');

const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).disallow(Joi.ref('oldPassword')).required()
        .messages({ 'any.invalid': 'New password must be different from old password' })
});


module.exports = { changePasswordSchema };