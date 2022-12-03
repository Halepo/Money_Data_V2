import express, { Router } from 'express';
import { IncomeController } from 'src/controllers/IncomeController';
import { isAuthorized } from 'src/middlewares/authorizationMiddleware';
import { Service } from 'src/services';

const service: Service = new Service();
const controller: IncomeController = new IncomeController(service);
const registerIncome = controller.registerIncome;
const getIncome = controller.getIncome;
const deleteIncome = controller.deleteIncome;
const editIncome = controller.editIncome;

const router: Router = express.Router();

// GET /income/
router.get('/', isAuthorized, getIncome);

// POST /income/register
router.post('/', isAuthorized, registerIncome);

// DELETE /income/delete
router.delete('/', isAuthorized, deleteIncome);

// PATCH /income/delete
router.patch('/', isAuthorized, editIncome);

export default router;
