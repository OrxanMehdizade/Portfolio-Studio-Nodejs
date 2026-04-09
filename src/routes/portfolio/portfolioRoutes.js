const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/authMiddleware');
const authorizeRoles = require('../../middleware/roleMiddleware');
const validate = require('../../middleware/validateMiddleware');
const upload = require('../../middleware/upload/uploadMiddleware');
const ROLES = require('../../constants/roles');
const rateLimit = require('express-rate-limit');


const { 
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    uploadAvatar,
    setField,
    deleteField,
    uploadFile,
    createArray,
    deleteArray,
    addItem,
    updateItem,
    deleteItem,
    sendMail
} = require('../../controllers/portfolio/portfolioController');

const { 
    sendMailSchema,
    createPortfolioSchema,
    updatePortfolioSchema,
    setFieldSchema,
    addItemSchema,
    updateItemSchema
} = require('../../validators/portfolio/portfolioValidator');

const adminAccess = [authMiddleware, authorizeRoles(ROLES.ADMIN)];


const sendMailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'Too many messages sent. Try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// ─── Public
router.get('/', getPortfolio);
router.post('/send-mail', sendMailLimiter, validate(sendMailSchema), sendMail);

// ─── Portfolio
router.post('/', adminAccess, validate(createPortfolioSchema), createPortfolio);
router.put('/', adminAccess, validate(updatePortfolioSchema), updatePortfolio);
router.delete('/', adminAccess, deletePortfolio);

// ─── Avatar
router.post('/avatar', adminAccess, upload.single('file'), uploadAvatar);

// ─── Upload
router.post('/upload', adminAccess, upload.single('file'), uploadFile);

// ─── Dynamic Fields
router.put('/fields/:fieldName', adminAccess, validate(setFieldSchema), setField);
router.delete('/fields/:fieldName', adminAccess, deleteField);

// ─── Arrays
router.post('/arrays/:arrayName', adminAccess, createArray);
router.delete('/arrays/:arrayName', adminAccess, deleteArray);

// ─── Array Items
router.post('/arrays/:arrayName/items', adminAccess, validate(addItemSchema), addItem);
router.put('/arrays/:arrayName/items/:itemId', adminAccess, validate(updateItemSchema), updateItem);
router.delete('/arrays/:arrayName/items/:itemId', adminAccess, deleteItem);


module.exports = router;