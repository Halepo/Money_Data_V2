const Joi = require('@hapi/joi');

export const createCategorySchema = Joi.object({
    category: Joi.string().required().error(() => {
        return {
            message: 'category is required and must be a valid string!'
        };
    }),
    description: Joi.string().error(() => {
        return {
            message: 'description must be a valid string!'
        };
    }),
    category_for: Joi.string().valid('expense', 'income').required().error(() => {
        return {
            message: 'category_for is required, must be a valid string and should either be expense or income!'
        };
    }),
});
export const deleteCategorySchema = Joi.object({
    id: Joi.string().hex().length(24).required().error(() => {
        return {
            message: 'id is required and must be a valid ObjectId as a string!'
        };
    })
});
export const editCategorySchema = Joi.object({
    id: Joi.string().hex().length(24).required().error(() => {
        return {
            message: 'id is required and must be a valid ObjectId as a string!'
        };
    }),
    category: Joi.string().required().error(() => {
        return {
            message: 'category is required and must be a valid string!'
        };
    }),
    description: Joi.string().error(() => {
        return {
            message: 'description must be a valid string!'
        };
    }),
    category_for: Joi.string().valid('expense', 'income').error(() => {
        return {
            message: 'category_for must be a valid string and should either be expense or income!'
        };
    }),
});