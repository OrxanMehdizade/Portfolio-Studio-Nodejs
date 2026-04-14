const mongoose = require('mongoose');
const { Schema } = mongoose;

const portfolioSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    title: { type: String },
    phone: { type: String }, 
    description: {type: String},
    email: { 
        type: String, 
        required: true,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    profileAvatar: { type: String, default: null },
    
    dynamicFields: { type: Map, of: Schema.Types.Mixed},

    arrays: [{
        name: {type: String, required: true},
        items: [{
            _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
            type: { type: String }, 
            value: { type: Schema.Types.Mixed }
        }]
    }],
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);