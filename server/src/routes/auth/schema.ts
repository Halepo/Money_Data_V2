const Joi = require('joi');

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - passwordConfirmation
 *       properties:
 *         name:
 *           type: string
 *           description: Full name for the user
 *         email:
 *           type: string
 *           description: email to login with
 *         password:
 *           type: string
 *           description: Password to login with
 *         passwordConfirmation:
 *           type: string
 *           description: Confirmation of password
 *       example:
 *         name: example name
 *         email: example@example.com
 *         password: example
 *         passwordConfirmation: example
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  passwordConfirmation: Joi.string().required(),
});
