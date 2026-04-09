const ApiError = require('../utils/apierror/apiError');


const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.admin.role)) {
            return next(new ApiError('Access denied', 403));
        }
        next();
    };
}; 

module.exports = authorizeRoles;
