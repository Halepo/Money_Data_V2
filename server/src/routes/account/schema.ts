const Joi = require('@hapi/joi');

/**
 * @swagger
 * components:
 *   schemas:
 *     Accounts:
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
 *   name: Accounts
 *   description: Accounts APIs
 */

export const createAccountSchema = Joi.object({
  userId: Joi.string()
    .hex()
    .length(24)
    .required()
    .error(() => {
      return {
        message:
          'user_id is required and must be a valid ObjectId as a string!',
      };
    }),
  balance: Joi.number()
    .required()
    .error(() => {
      return {
        message: 'account_balance is required and must be a valid number!',
      };
    }),
  name: Joi.string()
    .required()
    .error(() => {
      return {
        message: 'account_name is required and must be a valid string!',
      };
    }),
  bank: Joi.string().error(() => {
    return {
      message: 'bank must be a valid string!',
    };
  }),
  number: Joi.string().error(() => {
    return {
      message: 'account_number and must be a valid number!',
    };
  }),
  description: Joi.string().error(() => {
    return {
      message: 'account_description and must be a valid number!',
    };
  }),
});

export const getAllAccountsSchema = Joi.object({
  userId: Joi.string()
    .hex()
    .length(24)
    .required()
    .error(() => {
      return {
        message:
          'user_id is required and must be a valid ObjectId as a string!',
      };
    }),
});
