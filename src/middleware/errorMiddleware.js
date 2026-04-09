const logger = require('../utils/logger/logger') ;

const errorHandler = (err, req, res, next) => {
    logger.error({
        message: err.message,
        statusCode: err.statusCode || 500,
        path: req.path,
        method: req.method,
        stack: err.stack
    });

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Server Error'
    });
};
module.exports = errorHandler;

