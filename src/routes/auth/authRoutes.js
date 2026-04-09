const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const {login, logout, refresh, forgotPassword, resetPassword} = require('../../controllers/auth/authController');
const authMiddleware = require('../../middleware/authMiddleware');

const validate = require('../../middleware/validateMiddleware');

const { loginSchema, forgotPasswordSchema, resetPasswordSchema  } = require('../../validators/auth/authValidator');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 15,
    message: {
        success: false,
        message: 'Too many login attempts. Try again after 15 minutes.'
    },
    standardHeaders: true, 
    legacyHeaders: false,
    skipSuccessfulRequests: true,
});

router.post('/login', loginLimiter, validate(loginSchema), login);
router.post('/logout', authMiddleware, logout);
router.post('/refresh', refresh);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.put('/reset-password/:token', validate(resetPasswordSchema), resetPassword);


module.exports = router;