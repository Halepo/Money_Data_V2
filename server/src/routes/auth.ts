import express, { Router, Request, Response } from "express";
import { AuthController } from "src/controllers/AuthController";
import { Service } from "src/services";

const service: Service = new Service;
const controller: AuthController = new AuthController(service);
const login = controller.login;

const router: Router = express.Router();
// POST /auth/register
router.post('/login', login);

export default router;