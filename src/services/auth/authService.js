const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const ApiError = require('../../utils/apierror/apiError');
const adminRepo = require('../../repositories/adminRepository');


const {comparePassword, hashPassword} = require('../../utils/auth/hashPassword');
const {generateAccessToken, generateRefreshToken, generateResetToken} = require('../../utils/auth/generateTokens');
const sendEmail = require('../../utils/email/sendEmail');


const login = async (email, password) => {

    const admin = await adminRepo.findByEmail(email);

    if (!admin) {
        throw new ApiError('Invalid credentials', 401); 
    }

    const isMatch = await comparePassword(password, admin.password);
    
    if (!isMatch) {
        throw new ApiError('Invalid credentials', 401);
    }

    const accessToken = generateAccessToken(admin._id, admin.role);
    const refreshToken = generateRefreshToken(admin._id,admin.role);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await adminRepo.updateAdmin(admin._id, { refreshToken: hashedRefreshToken });

    const {password: pwd, refreshToken: rt, ...safeAdmin} = admin.toObject();

    return {
        admin: safeAdmin,
        accessToken,
        refreshToken
    };
};

const logout = async (adminId) => {

    const admin = await adminRepo.findById(adminId);

    if (!admin) {
        throw new ApiError('User not found', 404);
    }
    
    await adminRepo.updateAdmin(adminId, { refreshToken: null });

    return {message: "Logged out successfully"};
};

const refresh = async (refreshToken) => {
    
    if (!refreshToken) {
        throw new ApiError('No refresh token', 401);
    }

    let decoded;

    try{
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new ApiError('Invalid refresh token', 401);
    }

    const admin = await adminRepo.findById(decoded.id,{includeRefreshToken: true});

    if(!admin || !admin.refreshToken) {
        throw new ApiError('Invalid refresh token', 401);
    }

    const isMatch = await bcrypt.compare(refreshToken, admin.refreshToken);
   
    if (!isMatch) {
        throw new ApiError('Invalid refresh token', 401);
    }

    const newAccessToken = generateAccessToken(admin._id, admin.role);
    const newRefreshToken = generateRefreshToken(admin._id, admin.role);

    const hashedNewRefreshToken = await bcrypt.hash(newRefreshToken,10);

    await adminRepo.updateAdmin(admin._id, { refreshToken: hashedNewRefreshToken });


    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };

};

const forgotPassword = async(email) => {
    const admin = await adminRepo.findByEmail(email);
    if (!admin) throw new ApiError('No account found with this email', 404);

    const {resetToken, hashedToken, expireTime} = generateResetToken();

    await adminRepo.updateAdmin(admin._id, {
        resetPasswordToken: hashedToken,
        resetPasswordExpire: expireTime
    });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
        to: admin.email,
        subject: 'Password Reset Request',
        html: `
            <h3>Password Reset</h3>
            <p>Click the link below to reset your password. Link expires in 15 minutes.</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>If you did not request this, ignore this email.</p>
        `
    });

    return { message: 'Reset email sent' };
};

const resetPassword = async (resetToken, newPassword) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    
    const admin = await adminRepo.findByResetToken(hashedToken);
    if (!admin) throw new ApiError('Invalid or expired reset token', 400);

    const hashed = await hashPassword(newPassword);

    await adminRepo.updateAdmin(admin._id, {
        password: hashed,
        resetPasswordToken: null,
        resetPasswordExpire: null
    });

    return { message: 'Password reset successful' };
};



module.exports = {
    login, 
    logout, 
    refresh, 
    forgotPassword, 
    resetPassword
};