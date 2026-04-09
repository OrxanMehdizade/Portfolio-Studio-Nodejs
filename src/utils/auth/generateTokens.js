const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateAccessToken = (adminId, role) => {
    return jwt.sign(
        {id:adminId, role:role},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRE}
    );
};

const generateRefreshToken = (adminId, role) => {
    return jwt.sign(
        {id:adminId, role:role},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRE}
    );
};

const generateResetToken  = () => {
    const resetToken = crypto.randomBytes(32).toString('hex');

    const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    
    const expireTime = Date.now() + 15 * 60 * 1000;

    return { resetToken, hashedToken, expireTime };

};

module.exports = {generateAccessToken, generateRefreshToken, generateResetToken};
