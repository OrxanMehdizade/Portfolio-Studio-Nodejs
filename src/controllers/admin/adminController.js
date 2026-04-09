const asyncHandler = require('../../utils/handler/asyncHandler');
const adminService = require('../../services/admin/adminService');
const ApiError = require('../../utils/apierror/apiError');


const getMy = asyncHandler(async (req, res) => {
    const admin = await adminService.getMy(req.admin.id);
    res.json({ success: true, data: admin });
});

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const data = await adminService.changePassword(req.admin.id, oldPassword, newPassword);
    res.json({ success: true, data });
});

const uploadAvatar = asyncHandler( async (req, res) => {
    if (!req.file) {
        throw new ApiError('No file uploaded', 400);
    }

    const adminData = await adminService.uploadAvatar(req.admin.id, req.file);
    
    res.json({ success: true, data: adminData });
});

module.exports = {getMy, changePassword, uploadAvatar};