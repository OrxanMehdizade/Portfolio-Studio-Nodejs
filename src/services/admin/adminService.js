const adminRepo = require('../../repositories/adminRepository');
const ApiError = require('../../utils/apierror/apiError');
const { comparePassword, hashPassword } = require('../../utils/auth/hashPassword');
const uploadFile  = require('../../utils/uploadimg/uploader');
const tenantId = process.env.TENANT_ID || 'default';

const getMy = async (adminId) => {
    const admin = await adminRepo.findById(adminId);

    if(!admin) throw new ApiError('Admin not found', 404);

    const {password, refreshToken, role, ...safeAdmin} = admin.toObject();
    
    return safeAdmin;
}

const changePassword = async (adminId, oldPassword, newPassword) => {
    const admin = await adminRepo.findByIdWithPassword(adminId);
    if (!admin) throw new ApiError('Admin not found', 404);

    const isMatch = await comparePassword(oldPassword, admin.password);
    if (!isMatch) throw new ApiError('Old password is incorrect', 400);

    const hashed = await hashPassword(newPassword);
    await adminRepo.updateAdmin(adminId, { password: hashed });

    return { message: 'Password changed successfully' };
}

const updateMy = async ( adminId, data) => {
    const admin = await adminRepo.findById(adminId);
    if (!admin) throw new ApiError('Admin not found', 404);

    const { role, password, refreshToken, ...safeData } = data;

    if (data.email && data.email !== admin.email) {
        safeData.refreshToken = null;
    }

    const updated = await adminRepo.updateAdmin(adminId, safeData);
    if (!updated) throw new ApiError('Update failed', 500);

    const { password: pwd, refreshToken: rt, ...safeAdmin } = updated.toObject();

    return safeAdmin;
};

const uploadAvatar = async (adminId, file) => {
    const existing = await adminRepo.findById(adminId);
    if (!existing) throw new ApiError('Admin not found', 404);

    const result = await uploadFile(file.buffer, file.mimetype, tenantId, file.originalname);

    const admin = await adminRepo.updateAdmin(adminId, { avatar: result.url });

    const { password, refreshToken, ...adminData } = admin.toObject();
    
    return adminData;
};

module.exports = {getMy, changePassword, updateMy, uploadAvatar};
