import express, { Router, Request, Response } from 'express';
import { CategoryController } from '../../controllers/CategoryController';
import { isAuthorized } from 'src/middlewares/authorizationMiddleware';
import { Service } from '../../services';

const service: Service = new Service();
const controller: CategoryController = new CategoryController(service);
const createCategory = controller.createCategory;
const deleteCategory = controller.deleteCategory;
const getCategory = controller.getCategory;
const editCategory = controller.editCategory;

const router: Router = express.Router();

// POST /category/
router.post('/', isAuthorized, createCategory);

// DELETE /category/
router.delete('/', isAuthorized, deleteCategory);

// EDIT /category/
router.patch('/', isAuthorized, editCategory);

// GET /category/
router.get('/', isAuthorized, getCategory);
export default router;
