const Joi = require('joi');

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateAccountSchema:
 *       type: object
 *       required:
 *         - userId
 *         - balance
 *         - name
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
  userId: Joi.string().hex().length(24).required(),
  balance: Joi.number().required(),
  name: Joi.string().required(),
  bank: Joi.string(),
  number: Joi.string(),
  description: Joi.string(),
});

export const getAllAccountsSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
});
