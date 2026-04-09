const Joi = require('joi');

const sendMailSchema = Joi.object({
    email: Joi.string().email().required(),
    message: Joi.string().min(5).max(1000).required()
});

// ─── Portfolio 

const createPortfolioSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    title: Joi.string().trim().optional(),
    phone: Joi.string().trim().optional(),
    description: Joi.string().trim().optional(),
    email: Joi.string().email().required(),
    dynamicFields: Joi.object().pattern(
        Joi.string(),
        Joi.alternatives().try(
            Joi.string(),
            Joi.number(),
            Joi.boolean(),
            Joi.object(),
            Joi.array()
        )
    ).optional(),
    arrays: Joi.array().items(
        Joi.object({
            name: Joi.string().trim().required(),
            items: Joi.array().items(
                Joi.object({
                    value: Joi.alternatives().try(
                        Joi.string(),
                        Joi.number(),
                        Joi.boolean(),
                        Joi.object(),
                        Joi.array()
                    ).required(),
                    type: Joi.string().trim().optional()
                })
            ).optional()
        })
    ).optional()
});

const updatePortfolioSchema = Joi.object({
    firstName: Joi.string().trim().optional(),
    lastName: Joi.string().trim().optional(),
    title: Joi.string().trim().optional(),
    phone: Joi.string().trim().optional(),
    description: Joi.string().trim().optional(),
    email: Joi.string().email().optional(),
}).min(1);

// ─── Dynamic Fields 

const setFieldSchema = Joi.object({
    value: Joi.alternatives().try(
        Joi.string(),
        Joi.number(),
        Joi.boolean(),
        Joi.object(),
        Joi.array()
    ).required()
});

// ─── Array Items 

const addItemSchema = Joi.object({
    value: Joi.alternatives().try(
        Joi.string(),
        Joi.number(),
        Joi.boolean(),
        Joi.object(),
        Joi.array()
    ).required(),
    type: Joi.string().trim().optional()
});

const updateItemSchema = Joi.object({
    value: Joi.alternatives().try(
        Joi.string(),
        Joi.number(),
        Joi.boolean(),
        Joi.object(),
        Joi.array()
    ).required()
});

module.exports = {
    sendMailSchema,
    createPortfolioSchema,
    updatePortfolioSchema,
    setFieldSchema,
    addItemSchema,
    updateItemSchema
};