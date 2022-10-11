import { ObjectId } from 'bson';
import { ResponseBuilder } from '../shared/response-builder';
import { requestInterceptor } from '../interceptors/interceptor';
import { logger } from '../classes/consoleLoggerClass';
import { ErrorCode } from '../shared/error-codes';
import { Service } from 'src/services';
import { Request, Response } from 'express';
import { IExpense } from 'src/interfaces/expense';
import { deleteExpenseSchema, fetchAllExpenseSchema, registerExpenseSchema } from '@routes/expense/schema';

export class ExpenseController {
    public constructor(private readonly _service: Service) { }

    //register
    public registerExpense: any = async (req: Request, res: Response): Promise<void> => {
        requestInterceptor(req.body);
        try {
            if (req.body || req.params) {
                let validationBody = {
                    userId: req.body.user_id,
                    accountId: req.body.account_id,
                    categoryId: req.body.category_id,
                    amount: req.body.amount,
                    reason: req.body.reason,
                    description: req.body.description,
                };
                const result = registerExpenseSchema.validate(validationBody);
                logger.logData('validation result', result);
                if (!result.error) {
                    logger.infoData(result.value);
                    if (Object.keys(result.value).length === 0) {
                        return ResponseBuilder.badRequest(
                            ErrorCode.Invalid,
                            'request body is required and must be not empty',
                            res
                        );
                    }
                    let userId = result.value.userId;
                    let accountId = result.value.accountId;
                    let categoryId = result.value.categoryId;
                    let amount = result.value.amount;
                    let reason = result.value.reason;
                    let description = result.value.description;
                    let created = new Date().toISOString();

                    //check userId and accountId...
                    //

                    const newExpense: IExpense = {
                        userId: new ObjectId(userId),
                        accountId: new ObjectId(accountId),
                        categoryId: new ObjectId(categoryId),
                        amount: amount,
                        reason: reason,
                        description: description,
                        created: created,
                    }
                    let registeredExpense = await this._service.registerExpense(newExpense);
                    logger.infoData(registeredExpense, 'registeredExpense');
                    if (registeredExpense) {
                        return ResponseBuilder.ok(
                            { message: "Successfully Registered", data: registeredExpense },
                            res
                        );
                    } else {
                        return ResponseBuilder.configurationError(
                            ErrorCode.GeneralError,
                            'Error registering expense!',
                            res
                        );
                    }
                } else {
                    logger.infoData('error happened');
                    return ResponseBuilder.badRequest(
                        ErrorCode.Invalid,
                        result.error.details[0].message,
                        res
                    );
                }
            } else {
                logger.errorData('body parameters not found');
                return ResponseBuilder.badRequest(
                    ErrorCode.Invalid,
                    'body parameters not found',
                    res
                );
            }
        } catch (error) {
            logger.errorData(error);
            return ResponseBuilder.internalServerError(error, res);
        }
    };

    //fetch all Expense
    public getAllExpense: any = async (req: Request, res: Response): Promise<void> => {
        // requestInterceptor(req.query);
        logger.infoData(req.query)
        try {
            if (req.query) {
                let validationBody = {
                    userId: req.query.user_id,
                    accountId: req.query.account_id,
                };
                const result = fetchAllExpenseSchema.validate(validationBody);
                logger.logData('validation result', result);
                if (!result.error) {
                    logger.infoData(result.value);
                    if (Object.keys(result.value).length === 0) {
                        return ResponseBuilder.badRequest(
                            ErrorCode.Invalid,
                            'request params is required and must be not empty',
                            res
                        );
                    }
                    let userId = result.value.userId;
                    let accountId = result.value.accountId;

                    let allExpense = await this._service.getAllExpense(userId, accountId);
                    logger.infoData(allExpense, 'All Expense');
                    if (allExpense) {
                        return ResponseBuilder.ok(
                            { message: "Successfully Fetched", data: allExpense },
                            res
                        );
                    } else {
                        return ResponseBuilder.configurationError(
                            ErrorCode.GeneralError,
                            'Error fetching Expense!',
                            res
                        );
                    }
                } else {
                    logger.infoData('error happened');
                    return ResponseBuilder.badRequest(
                        ErrorCode.Invalid,
                        result.error.details[0].message,
                        res
                    );
                }
            } else {
                logger.errorData('body parameters not found');
                return ResponseBuilder.badRequest(
                    ErrorCode.Invalid,
                    'body parameters not found',
                    res
                );
            }
        } catch (error) {
            logger.errorData(error);
            return ResponseBuilder.internalServerError(error, res);
        }
    };

    //Delete Expense
    public deleteExpense: any = async (req: Request, res: Response): Promise<void> => {
        // requestInterceptor(req.query);
        logger.infoData(req.query)
        try {
            if (req.query) {
                let validationBody = {
                    id: req.query.id,
                };
                const result = deleteExpenseSchema.validate(validationBody);
                logger.logData('validation result', result);
                if (!result.error) {
                    logger.infoData(result.value);
                    if (Object.keys(result.value).length != 0) {
                        let id = result.value.id;
                        let deleted = await this._service.deleteExpense(id);
                        logger.infoData(deleted)
                        if (deleted) {
                            return ResponseBuilder.ok(
                                { message: "Successfully Deleted", data: deleted },
                                res
                            );
                        } else {
                            return ResponseBuilder.configurationError(
                                ErrorCode.GeneralError,
                                'Error deleting Expense!',
                                res
                            );
                        }
                    } else {
                        return ResponseBuilder.badRequest(
                            ErrorCode.Invalid,
                            'request params is required and must be not empty',
                            res
                        );
                    }
                } else {
                    logger.infoData('error happened');
                    return ResponseBuilder.badRequest(
                        ErrorCode.Invalid,
                        result.error.details[0].message,
                        res
                    );
                }
            } else {
                logger.errorData('body parameters not found');
                return ResponseBuilder.badRequest(
                    ErrorCode.Invalid,
                    'body parameters not found',
                    res
                );
            }
        } catch (error) {
            logger.errorData(error);
            return ResponseBuilder.internalServerError(error, res);
        }
    };
}
