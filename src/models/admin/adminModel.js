const mongoose = require('mongoose');
const { Schema } = mongoose;
const ROLES = require('../../constants/roles');

const adminSchema = new Schema({
    name: { type: String, required: true, trim: true},
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    password: { type: String, required: true, minlength:8},
    role: {type: String, enum:Object.values(ROLES), default:ROLES.ADMIN},
    refreshToken:{type:String, select: false, default:null},
    avatar: { type:String, default: null },
    resetPasswordToken: { type: String, select: false, default: null },
    resetPasswordExpire: { type: Date, select: false, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);