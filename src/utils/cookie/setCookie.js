
const isProd = process.env.NODE_ENV === 'production';

const setRefreshTokenCookie = (res, token) => {
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};

module.exports = { setRefreshTokenCookie };