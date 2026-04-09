const portfolioModel = require('../models/user/portfolioModel');
const mongoose = require('mongoose');

const getPortfolio = () => {
    return portfolioModel.findOne();
};

const createPortfolio = (data) => {
    return portfolioModel.create(data);
};

const updatePortfolio = (data) => {
    return portfolioModel.findOneAndUpdate({}, data, {
        returnDocument: 'after',
        runValidators: true
    });
};

const deletePortfolio = () => {
    return portfolioModel.findOneAndDelete({});
};


// Dynamic Fields
const setField = (fieldName, value) => {
    return portfolioModel.findOneAndUpdate(
        {},
        { $set: { [`dynamicFields.${fieldName}`]: value } },
        { returnDocument: 'after' }
    );
};

const deleteField = (fieldName) => {
    return portfolioModel.findOneAndUpdate(
        {},
        { $unset: { [`dynamicFields.${fieldName}`]: '' } },
        { returnDocument: 'after' }
    );
};

// Arrays
const createArray = (arrayName) => {
    return portfolioModel.findOneAndUpdate(
        { 'arrays.name': { $ne: arrayName } },
        { $push: { arrays: { name: arrayName, items: [] } } },
        { returnDocument: 'after'}
    );
};

const deleteArray = (arrayName) => {
    return portfolioModel.findOneAndUpdate(
        {},
        { $pull: { arrays: { name: arrayName } } },
        { returnDocument: 'after' }
    );
};

const addItem = (arrayName, item) => {
    return portfolioModel.findOneAndUpdate(
        { 'arrays.name': arrayName },
        { $push: { 'arrays.$.items': item } },
        { returnDocument: 'after' }
    );
};

const updateItem = (arrayName, itemId, newValue) => {
    return portfolioModel.findOneAndUpdate(
        { 'arrays.name': arrayName, 'arrays.items._id': new mongoose.Types.ObjectId(itemId) },
        { $set: { 'arrays.$[arr].items.$[item].value': newValue } },
        {
            arrayFilters: [
                { 'arr.name': arrayName },
                { 'item._id': new mongoose.Types.ObjectId(itemId) }
            ],
            returnDocument: 'after'
        }
    );
};

const deleteItem  = (arrayName, itemId) => {
    return portfolioModel.findOneAndUpdate(
        { 'arrays.name': arrayName },
        { $pull: { 'arrays.$.items': { _id: new mongoose.Types.ObjectId(itemId) } } },
        { returnDocument: 'after' }
    );
};





module.exports = {
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    setField,
    deleteField,
    createArray,
    deleteArray,
    addItem,
    updateItem,
    deleteItem 
};
