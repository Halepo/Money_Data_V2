import { ObjectId } from 'bson';
import { ResponseBuilder } from '../shared/response-builder';
import { requestInterceptor } from '../interceptors/interceptor';
import { logger } from '../classes/consoleLoggerClass';
import { ErrorCode } from '../shared/error-codes';
import { Service } from 'src/services';
import { Request, Response } from 'express';
import {
  createAccountSchema,
  getAllAccountsSchema,
} from '@routes/account/schema';
import { IAccount } from 'src/interfaces/accountInterface';
import { db } from 'src/config/database';
import { requestValidator } from 'src/classes/requestValidator';

export class AccountController {
  public constructor(private readonly _service: Service) {}
  // TODO Create new account
  // TODO Get all accounts for user by, account name, bank
  // TODO Get account stats by month, day and year i.e, account balance, total number of transactions, total in, total out
  // TODO Get account by account Id
  // TODO Edit account by Id
  // TODO Delete account by Id

  //register
  public createAccount: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    requestInterceptor(req);
    try {
      if (req.body || req.params) {
        let validationBody = {
          userId: req.body.user_id,
          balance: req.body.account_balance,
          defaultCurrency: req.body.default_currency,
          bank: req.body.bank,
          number: req.body.account_number,
          name: req.body.account_name,
          description: req.body.account_description,
        };
        const result = createAccountSchema.validate(validationBody);
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
          let balance = result.value.balance;
          let defaultCurrency = result.value.defaultCurrency;
          let bank = result.value.bank;
          let number = result.value.number;
          let name = result.value.name;
          let description = result.value.description;

          //validating balance
          if (!balance) {
            balance = 0;
          }

          // Validating userId
          let collections = ['User'];
          let ids = [new ObjectId(userId)];

          let validationResults =
            await requestValidator.validateCollectionItems(collections, ids);

          let [user] = validationResults;

          // Check if any of the variables is null or undefined
          if (!user) {
            return ResponseBuilder.badRequest(
              ErrorCode.Invalid,
              'Invalid User ID',
              res
            );
          }

          //check passwords match validation
          let existingAccount =
            await this._service.findExistingAccountByNumberOrName(
              userId,
              name,
              number
            );
          if (!existingAccount) {
            const newAccount: IAccount = {
              userId: new ObjectId(userId),
              accountBalance: balance,
              defaultCurrency: defaultCurrency,
              accountName: name,
              bank: bank,
              accountNumber: number,
              accountDescription: description,
              created: new Date().toISOString(),
            };
            let registeredAccount = await this._service.createAccount(
              newAccount
            );
            logger.infoData(registeredAccount, 'registeredAccount');
            if (registeredAccount) {
              return ResponseBuilder.ok(
                { message: 'Successfully Registered', data: registeredAccount },
                res
              );
            } else {
              return ResponseBuilder.configurationError(
                ErrorCode.GeneralError,
                'Error registering user!',
                res
              );
            }
          } else {
            logger.infoData('Account already exist!');
            return ResponseBuilder.badRequest(
              ErrorCode.Invalid,
              'Account already exist!',
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
      return ResponseBuilder.internalServerError(error, error.message);
    }
  };

  //get all accounts
  public getAllAccounts: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    requestInterceptor(req);
    try {
      if (req.body || req.query) {
        let validationBody = {
          userId: req.query.user_id,
        };
        const result = getAllAccountsSchema.validate(validationBody);
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
          let allAccounts = await this._service.getAllAccounts(userId);
          if (allAccounts) {
            logger.infoData(allAccounts, 'allAccounts');
            return ResponseBuilder.ok(
              { message: 'Successfully fetched!', data: allAccounts },
              res
            );
          } else {
            logger.infoData('Error fetching accounts!');
            return ResponseBuilder.badRequest(
              ErrorCode.Invalid,
              'Error fetching accounts!',
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
