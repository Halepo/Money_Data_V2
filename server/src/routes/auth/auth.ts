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

// POST /auth/register
router.post('/login', login);

// POST /auth/register
router.post('/register', register);

// GET /auth/register
router.get('/refresh', refresh);

// GET /auth/register
router.post('/logout', logout);

export default router;
