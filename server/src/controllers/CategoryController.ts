import { ResponseBuilder } from '../shared/response-builder';
import { requestInterceptor } from '../interceptors/interceptor';
import { logger } from '../classes/consoleLoggerClass';
import { ErrorCode } from '../shared/error-codes';
import { Service } from '../services';
import { Request, Response } from 'express';
import { ICategory } from '../interfaces/categoryInterface';
import {
  createCategorySchema,
  deleteCategorySchema,
  editCategorySchema,
  getTransactionSchema,
} from '../routes/category/schema';
import { requestValidator } from 'src/classes/requestValidator';
export class CategoryController {
  public constructor(private readonly _service: Service) {}

  //register
  public createCategory: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    requestInterceptor(req);
    try {
      if (req.body || req.params) {
        let validationBody = {
          category: req.body.category,
          description: req.body.description,
          transaction_type: req.body.transaction_type,
        };
        const result = createCategorySchema.validate(validationBody);
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
          let category = result.value.category;
          let description = result.value.description;
          let created = new Date().toISOString();
          let transactionType = result.value.transaction_type;

          //check userId and accountId...
          //

          const newCategory: ICategory = {
            category: category,
            description: description,
            created: created,
            transactionType: transactionType,
          };
          let createdCategory = await this._service.createCategory(newCategory);
          logger.infoData(createdCategory, 'createdCategory');
          if (createdCategory) {
            return ResponseBuilder.ok(
              { message: 'Successfully Registered', data: createdCategory },
              res
            );
          } else {
            return ResponseBuilder.configurationError(
              ErrorCode.GeneralError,
              'Error registering category!',
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

  //fetch all Category
  public getCategory: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    requestInterceptor(req);
    //TODO get category by ID
    let validationBody = {
      required: true,
      body: {
        id: req.query.id,
        category: req.query.category,
        description: req.query.description,
        category_for: req.query.category_for,
      },
      schema: getTransactionSchema,
    };

    let result = requestValidator.validateRequest(res, validationBody);
    if (result) {
      const {
        id,
        category,
        description,
        category_for: categoryFor,
      } = result.value;

      logger.infoData('Getting categories');
      try {
        let fetchedCategory = await this._service.getCategory(
          id,
          category,
          description,
          categoryFor
        );
        logger.infoData(fetchedCategory, 'All Category');
        if (fetchedCategory) {
          return ResponseBuilder.ok(
            { message: 'Successfully Fetched', data: fetchedCategory },
            res
          );
        } else {
          return ResponseBuilder.configurationError(
            ErrorCode.GeneralError,
            'Error fetching Category!',
            res
          );
        }
      } catch (error) {
        logger.errorData(error);
        return ResponseBuilder.internalServerError(error, res);
      }
    }
  };

  //Delete Category
  public deleteCategory: any = async (
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
        const result = deleteCategorySchema.validate(validationBody);
        logger.logData('validation result', result);
        if (!result.error) {
          logger.infoData(result.value);
          if (Object.keys(result.value).length != 0) {
            let id = result.value.id;
            let deleted = await this._service.deleteCategory(id);
            logger.infoData(deleted);
            if (deleted) {
              return ResponseBuilder.ok(
                { message: 'Successfully Deleted', data: deleted },
                res
              );
            } else {
              return ResponseBuilder.configurationError(
                ErrorCode.GeneralError,
                'Error deleting Category!',
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

  //Edit Category
  public editCategory: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    requestInterceptor(req);
    // logger.infoData(req.query)
    try {
      if (req.body) {
        let validationBody = {
          id: req.body.id,
          category: req.body.category,
          description: req.body.description,
        };
        const result = editCategorySchema.validate(validationBody);
        logger.logData('validation result', result);
        if (!result.error) {
          logger.infoData(result.value);
          if (Object.keys(result.value).length != 0) {
            let id = result.value.id;
            let category = result.value.category;
            let description = result.value.description;
            let transactionType = result.value.transactionType;

            const update: any = {
              category: category,
              description: description,
              transactionType: transactionType,
            };
            let updatedCategory = await this._service.editCategory(id, update);
            logger.infoData(updatedCategory, 'updatedCategory');
            if (updatedCategory) {
              return ResponseBuilder.ok(
                { message: 'Successfully updated', data: updatedCategory },
                res
              );
            } else {
              return ResponseBuilder.configurationError(
                ErrorCode.GeneralError,
                'Error registering category!',
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
