import { JoiCustom } from 'src/shared/joi-custom';

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

export const loginSchema = JoiCustom.object({
  email: JoiCustom.string().required(),
  password: JoiCustom.string().required(),
});
export const registerSchema = JoiCustom.object({
  name: JoiCustom.string().required(),
  email: JoiCustom.string().required(),
  password: JoiCustom.string().required(),
  passwordConfirmation: JoiCustom.string().required(),
});
