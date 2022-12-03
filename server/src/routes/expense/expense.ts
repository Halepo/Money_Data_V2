import express, { Router, Request, Response } from "express";
import { ExpenseController } from "src/controllers/ExpenseController";
import { isAuthorized } from "src/middlewares/authorizationMiddleware";
import { Service } from "src/services";

const service: Service = new Service;
const controller: ExpenseController = new ExpenseController(service);
const registerExpense = controller.registerExpense;
const getAllExpense = controller.getAllExpense;
const deleteExpense = controller.deleteExpense;

const router: Router = express.Router();

// POST /expense/register
router.post('/', isAuthorized, registerExpense);

// GET /expense
router.get('/', isAuthorized, getAllExpense);

// DELETE /expense/register
router.delete('/', isAuthorized, deleteExpense);

export default router;