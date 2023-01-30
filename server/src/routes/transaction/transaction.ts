import express, { Router } from 'express';
import { TransactionController } from 'src/controllers/TransactionController';
import { isAuthorized } from 'src/middlewares/authorizationMiddleware';
import { Service } from 'src/services';

const service: Service = new Service();
const controller: TransactionController = new TransactionController(service);
const registerTransaction = controller.registerTransaction;
const getTransaction = controller.getTransaction;
const deleteTransaction = controller.deleteTransaction;
const editTransaction = controller.editTransaction;

const router: Router = express.Router();

// GET /transaction/
router.get('/', isAuthorized, getTransaction);

// POST /transaction/register
router.post('/', isAuthorized, registerTransaction);

// DELETE /transaction/delete
router.delete('/', isAuthorized, deleteTransaction);

// PATCH /transaction/delete
router.patch('/', isAuthorized, editTransaction);

export default router;
