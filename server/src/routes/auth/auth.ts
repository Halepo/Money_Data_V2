import express, { Router } from 'express';
import { AuthController } from 'src/controllers/AuthController';
import { Service } from 'src/services';

const service: Service = new Service();
const controller: AuthController = new AuthController(service);
const login = controller.login;
const register = controller.register;
const refresh = controller.refresh;
const logout = controller.logout;

const router: Router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logging in
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Auth'
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/register:
 *   requestBody:
 *     description: Optional description in *Markdown*
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Auth'
 *       application/xml:
 *         schema:
 *           $ref: '#/components/schemas/Auth'
 *       application/x-www-form-urlencoded:
 *         schema:
 *           $ref: '#/components/schemas/Auth'
 *       text/plain:
 *         schema:
 *           type: string
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: registered user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Auth'
 *
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     summary: refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Auth'
 */
router.get('/refresh', refresh);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logs out the application
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Auth'
 */
router.post('/logout', logout);

export default router;
