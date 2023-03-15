import { JoiCustom } from 'src/shared/joi-custom';
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

export const createAccountSchema = JoiCustom.object({
  userId: JoiCustom.string().hex().length(24).required(),
  name: JoiCustom.string().required(),
  defaultCurrency: JoiCustom.currency().required(),
  balance: JoiCustom.number(),
  bank: JoiCustom.string(),
  number: JoiCustom.string(),
  description: JoiCustom.string(),
});

export const getAccountsSchema = JoiCustom.object({
  id: JoiCustom.string().hex().length(24),
  userId: JoiCustom.string().hex().length(24).required(),
  balance: JoiCustom.number(),
  name: JoiCustom.string(),
  bank: JoiCustom.string(),
  number: JoiCustom.string(),
  description: JoiCustom.string(),
});
