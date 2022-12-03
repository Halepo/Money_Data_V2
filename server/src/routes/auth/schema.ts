const Joi = require('@hapi/joi');

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

export const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .error(() => {
      return {
        message: 'email is required and must be a valid string!',
      };
    }),
  password: Joi.string()
    .required()
    .error(() => {
      return {
        message: 'password is required and must be a valid string!',
      };
    }),
});
export const registerSchema = Joi.object({
  name: Joi.string()
    .required()
    .error(() => {
      return {
        message: 'email is required and must be a valid string!',
      };
    }),
  email: Joi.string()
    .required()
    .error(() => {
      return {
        message: 'email is required and must be a valid string!',
      };
    }),
  password: Joi.string()
    .required()
    .error(() => {
      return {
        message: 'password is required and must be a valid string!',
      };
    }),
  passwordConfirmation: Joi.string()
    .required()
    .error(() => {
      return {
        message: 'password is required and must be a valid string!',
      };
    }),
});
