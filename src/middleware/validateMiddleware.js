const ApiError = require('../utils/apierror/apiError');

const validate = (schema) => (req, res, next) => {

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const messages = error.details.map(err => err.message);

        return next(new ApiError(messages.join(', '), 400));
    }

    next();
};

module.exports = validate;