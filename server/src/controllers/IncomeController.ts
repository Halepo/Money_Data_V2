import { ObjectId } from 'bson';
import { ResponseBuilder } from '../shared/response-builder';
import { requestInterceptor } from '../interceptors/interceptor';
import { logger } from '../classes/consoleLoggerClass';
import { ErrorCode } from '../shared/error-codes';
import { Service } from 'src/services';
import { Request, Response } from 'express';
import {
  deleteIncomeSchema,
  editIncomeSchema,
  fetchAllIncomeSchema,
  registerIncomeSchema,
} from '@routes/income/schema';
import { IIncome } from 'src/interfaces/income';

export class IncomeController {
  public constructor(private readonly _service: Service) {}

  //register
  public registerIncome: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    requestInterceptor(req);
    try {
      if (req.body || req.params) {
        let validationBody = {
          userId: req.body.user_id,
          accountId: req.body.account_id,
          categoryId: req.body.category_id,
          amount: req.body.amount,
          reason: req.body.reason,
        };
        const result = registerIncomeSchema.validate(validationBody);
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
          let created = new Date().toISOString();

          //check userId and accountId...
          //

          const newIncome: IIncome = {
            userId: new ObjectId(userId),
            accountId: new ObjectId(accountId),
            categoryId: new ObjectId(categoryId),
            amount: amount,
            reason: reason,
            created: created,
          };
          let registeredIncome = await this._service.registerIncome(newIncome);
          logger.infoData(registeredIncome, 'registeredIncome');
          if (registeredIncome) {
            return ResponseBuilder.ok(
              { message: 'Successfully Registered', data: registeredIncome },
              res
            );
          } else {
            return ResponseBuilder.configurationError(
              ErrorCode.GeneralError,
              'Error registering income!',
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

  //fetch all income
  //TODO add support for filtering by date (default by month)
  public getIncome: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    // requestInterceptor(req);
    logger.infoData(req.query);
    try {
      if (req.query) {
        let validationBody = {
          userId: req.query.user_id,
          accountId: req.query.account_id,
        };
        const result = fetchAllIncomeSchema.validate(validationBody);
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

          let allIncome = await this._service.getAllIncome(userId, accountId);
          logger.infoData(allIncome, 'All income');
          if (allIncome) {
            return ResponseBuilder.ok(
              { message: 'Successfully Fetched', data: allIncome },
              res
            );
          } else {
            return ResponseBuilder.configurationError(
              ErrorCode.GeneralError,
              'Error fetching incomes!',
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

  //Delete Income
  public deleteIncome: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    // requestInterceptor(req);
    logger.infoData(req.query);
    try {
      if (req.query) {
        let validationBody = {
          id: req.query.id,
        };
        const result = deleteIncomeSchema.validate(validationBody);
        logger.logData('validation result', result);
        if (!result.error) {
          logger.infoData(result.value);
          if (Object.keys(result.value).length != 0) {
            let id = result.value.id;
            let deleted = await this._service.deleteIncome(id);
            if (deleted) {
              return ResponseBuilder.ok(
                { message: 'Successfully Deleted', data: deleted },
                res
              );
            } else {
              return ResponseBuilder.configurationError(
                ErrorCode.GeneralError,
                'Error deleting income!',
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

  //Edit Income
  public editIncome: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    requestInterceptor(req);
    try {
      if (req.body || req.params) {
        let validationBody = {
          id: req.body.id,
          categoryId: req.body.category_id,
          amount: req.body.amount,
          reason: req.body.reason,
          description: req.body.description,
        };
        const result = editIncomeSchema.validate(validationBody);
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
          let id = result.value.id;
          let categoryId = result.value.categoryId;
          let amount = result.value.amount;
          let reason = result.value.reason;
          let description = result.value.description;

          //check userId and accountId...
          //

          const update: IIncome = {
            id: new ObjectId(id),
            categoryId: new ObjectId(categoryId),
            amount: amount,
            reason: reason,
            description: description,
          };
          let updatedIncome = await this._service.updateIncome(id, update);
          logger.infoData(updatedIncome, 'updatedIncome');
          if (updatedIncome) {
            return ResponseBuilder.ok(
              { message: 'Successfully updated', data: updatedIncome },
              res
            );
          } else {
            return ResponseBuilder.configurationError(
              ErrorCode.GeneralError,
              'Error updating income!',
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
