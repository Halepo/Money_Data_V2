import express, { Router, Request, Response } from "express";
import { IncomeController } from "src/controllers/IncomeController";
import { isAuthorized } from "src/middlewares/authorizationMiddleware";
import { Service } from "src/services";

const service: Service = new Service;
const controller: IncomeController = new IncomeController(service);
const registerIncome = controller.registerIncome;
const getAllIncome = controller.getAllIncome;
const deleteIncome = controller.deleteIncome;
const editIncome = controller.editIncome;

const router: Router = express.Router();

// POST /income/
router.get('/', isAuthorized, getAllIncome);

// POST /income/register
router.post('/', isAuthorized, registerIncome);

// POST /income/delete
router.delete('/', isAuthorized, deleteIncome);

// POST /income/delete
router.patch('/', isAuthorized, editIncome);

export default router;