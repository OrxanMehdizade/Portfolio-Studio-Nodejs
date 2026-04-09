const authService = require('../../services/auth/authService');
const asyncHandler = require('../../utils/handler/asyncHandler');
const ApiError = require('../../utils/apierror/apiError');
const { setRefreshTokenCookie } = require('../../utils/cookie/setCookie');


const login = asyncHandler( async (req, res) => {

    const {email, password} = req.body;

    const data = await authService.login(email, password);

    setRefreshTokenCookie(res, data.refreshToken);

    res.json({
        success: true, 
        data:{
            admin: data.admin,
            accessToken: data.accessToken
        } 
    });

});

const logout = asyncHandler( async (req, res) => {
        
    const adminId = req.admin.id;

    const data = await authService.logout(adminId);

    res.clearCookie('refreshToken');

    res.json({ success: true, data });

});

const refresh = asyncHandler(async (req, res) => {
    
    if (!req.cookies.refreshToken) {
        throw new ApiError('No refresh token', 401);
    }

    const refreshToken = req.cookies.refreshToken;
    
    const data = await authService.refresh(refreshToken);

    setRefreshTokenCookie(res, data.refreshToken);

    res.json({
        success: true, 
        data: {
            accessToken: data.accessToken
        } 
    });
});

const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body;
    const data = await authService.forgotPassword(email);
    res.json({ success: true, data });
});

const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const data = await authService.resetPassword(token, password);
    res.json({ success: true, data });
});

module.exports = {
    login,
    logout,
    refresh,
    forgotPassword, 
    resetPassword
};