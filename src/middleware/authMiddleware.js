const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/handler/asyncHandler');
const ApiError = require('../utils/apierror/apiError');

const authMiddleware = asyncHandler((req, res, next) => {
    
    const header = req.headers.authorization;

    if(!header){
        throw new ApiError('No token', 401);
    }

    if(!header.startsWith('Bearer ')){
        throw new ApiError('Invalid token format', 401);
    }

    const token = header.split(' ')[1];

    try{

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.admin = {
            id: decoded.id,
            role: decoded.role
        };

        next();
    } catch {
        throw new ApiError('Invalid token', 401);
    }

});

module.exports = authMiddleware;