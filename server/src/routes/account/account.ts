import express, { Router, Request, Response } from 'express';
import { AccountController } from 'src/controllers/AccountController';
import { isAuthorized } from 'src/middlewares/authorizationMiddleware';
import { Service } from 'src/services';

const service: Service = new Service();
const controller: AccountController = new AccountController(service);
const createAccount = controller.createAccount;
const getAllAccounts = controller.getAllAccounts;

const router: Router = express.Router();

/**
 * @swagger
 * /account:
 *   post:
 *     summary: Create new account
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 */
router.post('/', isAuthorized, createAccount);

/**
 * @swagger
 * /account:
 *   get:
 *     summary: Get accounts
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 */
router.get('/', isAuthorized, getAllAccounts);

export default router;
