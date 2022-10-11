import express, { Router, Request, Response } from "express";
import { AuthController } from "src/controllers/AuthController";
import { Service } from "src/services";

const service: Service = new Service;
const controller: AuthController = new AuthController(service);
const login = controller.login;
const register = controller.register;

const router: Router = express.Router();

// POST /auth/register
router.post('/login', login);

// POST /auth/register
router.post('/register', register);

export default router;