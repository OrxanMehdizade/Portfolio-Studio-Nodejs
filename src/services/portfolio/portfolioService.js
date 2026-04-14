const portfolioRepo = require('../../repositories/portfolioRepository');
const ApiError = require('../../utils/apierror/apiError');
const uploadFile = require('../../utils/uploadimg/uploader');
const sendEmail = require('../../utils/email/sendEmail');
const sanitizeHtml = require('sanitize-html');

const tenantId = process.env.TENANT_ID || 'default';

const getPortfolio = async () => {
    const portfolio = await portfolioRepo.getPortfolio();
    if (!portfolio) throw new ApiError('Portfolio not found', 404);
    
    return portfolio;
};

const createPortfolio = async (data) => {
    const existing = await portfolioRepo.getPortfolio();
    if (existing) throw new ApiError('Portfolio already exists', 400);
    
    return portfolioRepo.createPortfolio(data);
};

const updatePortfolio = async (data) => {
    const existing = await portfolioRepo.getPortfolio();
    if (!existing) throw new ApiError('Portfolio not found', 404);
    
    const portfolio = await portfolioRepo.updatePortfolio(data);
    return portfolio;
};

const deletePortfolio = async () => {
    const portfolio = await portfolioRepo.getPortfolio();
    if (!portfolio) throw new ApiError('Portfolio not found', 404);
    
    await portfolioRepo.deletePortfolio();
    return { message: 'Portfolio deleted successfully' };
};

const uploadAvatar = async (file) => {
    const existing = await portfolioRepo.getPortfolio();
    if (!existing) throw new ApiError('Portfolio not found', 404);

    const result = await uploadFile(file.buffer, file.mimetype, tenantId, file.originalname);
    const portfolio = await portfolioRepo.updatePortfolio({ profileAvatar: result.url });
    
    return portfolio;
};
// ─── Dynamic Fields

const setField = async (fieldName, value) => {
    const existing = await portfolioRepo.getPortfolio();
    if (!existing) throw new ApiError('Portfolio not found', 404);

    const portfolio = await portfolioRepo.setField(fieldName, value);
    return portfolio; 
};

const deleteField = async (fieldName) => {
    const portfolio = await portfolioRepo.getPortfolio();
    if (!portfolio) throw new ApiError('Portfolio not found', 404);

    const fieldExists = portfolio.dynamicFields?.has(fieldName);
    if (!fieldExists) throw new ApiError(`Field "${fieldName}" not found`, 404);

    return portfolioRepo.deleteField(fieldName);
};

// ─── Upload (dinamik field/item üçün)

const uploadFieldFile = async (file) => {
    const result = await uploadFile(file.buffer, file.mimetype, tenantId, file.originalname);
    return { url: result.url };
};

// ─── Arrays

const createArray = async (arrayName) => {
    const portfolio = await portfolioRepo.getPortfolio();
    if (!portfolio) throw new ApiError('Portfolio not found', 404);

    const exists = portfolio.arrays?.some(a => a.name === arrayName);
    if (exists) throw new ApiError(`Array "${arrayName}" already exists`, 400);

    return portfolioRepo.createArray(arrayName);
};

const deleteArray = async (arrayName) => {
    const portfolio = await portfolioRepo.getPortfolio();
    if (!portfolio) throw new ApiError('Portfolio not found', 404);

    const exists = portfolio.arrays?.some(a => a.name === arrayName);
    if (!exists) throw new ApiError(`Array "${arrayName}" not found`, 404);

    return portfolioRepo.deleteArray(arrayName);
};

// ─── Array Items

const addItem = async (arrayName, item) => {
    const portfolio = await portfolioRepo.getPortfolio();
    if (!portfolio) throw new ApiError('Portfolio not found', 404);

    const exists = portfolio.arrays?.some(a => a.name === arrayName);
    if (!exists) throw new ApiError(`Array "${arrayName}" not found`, 404);

    return portfolioRepo.addItem(arrayName, item);
};

const updateItem = async (arrayName, itemId, newValue) => {
    const portfolio = await portfolioRepo.getPortfolio();
    if (!portfolio) throw new ApiError('Portfolio not found', 404);

    const array = portfolio.arrays?.find(a => a.name === arrayName);
    if (!array) throw new ApiError(`Array "${arrayName}" not found`, 404);

    const itemExists = array.items?.some(i => i._id.toString() === itemId);
    if (!itemExists) throw new ApiError(`Item not found`, 404);

    return portfolioRepo.updateItem(arrayName, itemId, newValue);
};

const deleteItem = async (arrayName, itemId) => {
    const portfolio = await portfolioRepo.getPortfolio();
    if (!portfolio) throw new ApiError('Portfolio not found', 404);

    const array = portfolio.arrays?.find(a => a.name === arrayName);
    if (!array) throw new ApiError(`Array "${arrayName}" not found`, 404);

    const itemExists = array.items?.some(i => i._id.toString() === itemId);
    if (!itemExists) throw new ApiError(`Item not found`, 404);

    return portfolioRepo.deleteItem(arrayName, itemId);
};


// ─── Send Mail

const sendMail = async (email, message) => {
    const portfolio = await portfolioRepo.getPortfolio();
    if (!portfolio) throw new ApiError('Portfolio not found', 404);

    const cleanMessage = sanitizeHtml(message, {
        allowedTags: [],
        allowedAttributes: {}
    });

    const cleanEmail = sanitizeHtml(email, {
        allowedTags: [],
        allowedAttributes: {}
    });

    await sendEmail({
        to: portfolio.email,
        replyTo: cleanEmail,
        subject: `New message from ${cleanEmail}`,
        html: `
            <h3>New contact form message</h3>
            <p><strong>From:</strong> ${cleanEmail}</p>
            <p><strong>Message:</strong></p>
            <p>${cleanMessage}</p>
        `
    });

    return { message: 'Email sent successfully' };
};



module.exports = {
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    uploadAvatar,
    setField,
    deleteField,
    uploadFieldFile,
    createArray,
    deleteArray,
    addItem,
    updateItem,
    deleteItem,
    sendMail
};