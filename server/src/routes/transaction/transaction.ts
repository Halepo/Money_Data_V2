import express, { Router } from 'express';
import { TransactionController } from 'src/controllers/TransactionController';
import { isAuthorized } from 'src/middlewares/authorizationMiddleware';
import { Service } from 'src/services';

const service: Service = new Service();
const controller: TransactionController = new TransactionController(service);
const registerTransaction = controller.registerTransaction;
const getTransaction = controller.getTransaction;
const deleteTransaction = controller.deleteTransaction;
// const editTransaction = controller.editTransaction;

const router: Router = express.Router();

// GET /income/
router.get('/', isAuthorized, getTransaction);

// POST /income/register
router.post('/', isAuthorized, registerTransaction);

// DELETE /income/delete
router.delete('/', isAuthorized, deleteTransaction);

// PATCH /income/delete
// router.patch('/', isAuthorized, editTransaction);

export default router;
