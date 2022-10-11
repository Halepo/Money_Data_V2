const Joi = require('@hapi/joi');

export const loginSchema = Joi.object({
    email: Joi.string().required().error(() => {
        return {
            message: 'email is required and must be a valid string!'
        };
    }),
    password: Joi.string().required().error(() => {
        return {
            message: 'password is required and must be a valid string!'
        };
    }),
});
export const registerSchema = Joi.object({
    name: Joi.string().required().error(() => {
        return {
            message: 'email is required and must be a valid string!'
        };
    }),
    email: Joi.string().required().error(() => {
        return {
            message: 'email is required and must be a valid string!'
        };
    }),
    password: Joi.string().required().error(() => {
        return {
            message: 'password is required and must be a valid string!'
        };
    }),
    passwordConfirmation: Joi.string().required().error(() => {
        return {
            message: 'password is required and must be a valid string!'
        };
    }),
});