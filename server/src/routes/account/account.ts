import express, { Router, Request, Response } from "express";
import { AccountController } from "src/controllers/AccountController";
import { isAuthorized } from "src/middlewares/authorizationMiddleware";
import { Service } from "src/services";

const service: Service = new Service;
const controller: AccountController = new AccountController(service);
const createAccount = controller.createAccount;
const getAllAccounts = controller.getAllAccounts;

const router: Router = express.Router();

// POST /account/create
router.post('/', isAuthorized, createAccount);

// GET /account
router.get('/', isAuthorized, getAllAccounts);

export default router;