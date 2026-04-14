const adminModel = require('../models/admin/adminModel');

const findByEmail = (email) => {
    return adminModel.findOne({email}).select('+password');
}

const findById = (id, options = {}) => {
    let query = adminModel.findById(id);
    if(options.includeRefreshToken) {
        query = query.select('+refreshToken');
    }
    return query;
};

const existsByRole = (role) => {
    return adminModel.exists({ role });
};

const findByResetToken = (hashedToken) => {
    return adminModel.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: {$gt: Date.now()}
    }).select('+resetPasswordToken +resetPasswordExpire')
};

const findByIdWithPassword = (id) => {
    return adminModel.findById(id).select('+password');
};

const createAdmin = (data) => {
    return adminModel.create(data);
};

const updateAdmin = (id, data) => {
    return adminModel.findByIdAndUpdate(id, data, {returnDocument: 'after', runValidators: true});
};

const existsByEmail = (email) => {
    return adminModel.exists({ email });
};



module.exports = {
    findByEmail,
    findById,
    createAdmin,
    updateAdmin,
    existsByEmail,
    findByResetToken,
    findByIdWithPassword,
    existsByRole
};