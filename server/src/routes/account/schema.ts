const Joi = require('@hapi/joi');

export const createAccountSchema = Joi.object({
    userId: Joi.string().hex().length(24).required().error(() => {
        return {
            message: 'user_id is required and must be a valid ObjectId as a string!'
        };
    }),
    balance: Joi.number().required().error(() => {
        return {
            message: 'account_balance is required and must be a valid number!'
        };
    }),
    name: Joi.string().required().error(() => {
        return {
            message: 'account_name is required and must be a valid string!'
        };
    }),
    bank: Joi.string().error(() => {
        return {
            message: 'bank must be a valid string!'
        };
    }),
    number: Joi.string().error(() => {
        return {
            message: 'account_number and must be a valid number!'
        };
    }),
    description: Joi.string().error(() => {
        return {
            message: 'account_description and must be a valid number!'
        };
    }),
});

export const getAllAccountsSchema = Joi.object({
    userId: Joi.string().hex().length(24).required().error(() => {
        return {
            message: 'user_id is required and must be a valid ObjectId as a string!'
        };
    }),
});