const asyncHandler = require('../../utils/handler/asyncHandler');
const ApiError = require('../../utils/apierror/apiError');
const portfolioService = require('../../services/portfolio/portfolioService');

const getPortfolio = asyncHandler(async (req, res) => {
    const portfolio = await portfolioService.getPortfolio();
    res.json({ success: true, data: portfolio });
});

const createPortfolio = asyncHandler(async (req, res) => {
    const portfolio = await portfolioService.createPortfolio(req.body);
    res.status(201).json({ success: true, data: portfolio });
});

const updatePortfolio = asyncHandler(async (req,res) => {
    const portfolio = await portfolioService.updatePortfolio(req.body);
    res.json({ success: true, data: portfolio });
});

const deletePortfolio = asyncHandler(async (req, res) => {
    const data = await portfolioService.deletePortfolio();
    res.json({ success: true, data });
});

const uploadAvatar = asyncHandler(async (req, res) => {
    if (!req.file) throw new ApiError('No file uploaded', 400);
    const portfolio = await portfolioService.uploadAvatar(req.file);
    res.json({ success: true, data: portfolio });
});

// ─── Dynamic Fields

const setField = asyncHandler(async (req, res) => {
    const { fieldName } = req.params;
    const { value } = req.body;

    if (value === undefined) throw new ApiError('Value is required', 400);

    const portfolio = await portfolioService.setField(fieldName, value);
    res.json({ success: true, data: portfolio });
});

const deleteField = asyncHandler(async (req, res) => {
    const { fieldName } = req.params;
    const portfolio = await portfolioService.deleteField(fieldName);
    res.json({ success: true, data: portfolio });
});

// ─── Upload

const uploadFile = asyncHandler(async (req,res) => {
    if (!req.file) throw new ApiError('No file uploaded', 400);
    const data = await portfolioService.uploadFieldFile(req.file);
    res.json({ success: true, data });
});

// ─── Arrays

const createArray = asyncHandler(async (req, res) => {
    const { arrayName } = req.params;
    const portfolio = await portfolioService.createArray(arrayName);
    res.status(201).json({ success: true, data: portfolio });
});

const deleteArray = asyncHandler(async (req, res) => {
    const { arrayName } = req.params;
    const portfolio = await portfolioService.deleteArray(arrayName);
    res.json({ success: true, data: portfolio });
});

// ─── Array Items

const addItem = asyncHandler(async (req, res) => {
    const { arrayName } = req.params;
    const { value, type } = req.body;

    if (value === undefined) throw new ApiError('Value is required', 400);

    const portfolio = await portfolioService.addItem(arrayName, { value, type });
    res.status(201).json({ success: true, data: portfolio });
});

const updateItem = asyncHandler(async (req, res) => {
    const { arrayName, itemId } = req.params;
    const { value } = req.body;

    if (value === undefined) throw new ApiError('Value is required', 400);

    const portfolio = await portfolioService.updateItem(arrayName, itemId, value);
    res.json({ success: true, data: portfolio });
});

const deleteItem = asyncHandler(async (req, res) => {
    const { arrayName, itemId } = req.params;
    const portfolio = await portfolioService.deleteItem(arrayName, itemId);
    res.json({ success: true, data: portfolio });
})

// ─── Send Mail

const sendMail = asyncHandler(async (req, res) => {
    const { email, message } = req.body;
    const data = await portfolioService.sendMail(email, message);
    res.json({ success: true, data });
});



module.exports = {
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
};