import { ObjectId } from 'bson';
import { ResponseBuilder } from '../shared/response-builder';
import { requestInterceptor } from '../interceptors/interceptor';
import { logger } from '../classes/consoleLoggerClass';
import { ErrorCode } from '../shared/error-codes';
import { Service } from 'src/services';
import { Request, Response } from 'express';
import {
  deleteTransactionSchema,
  editTransactionSchema,
  fetchTransactionSchema,
  registerTransactionSchema,
} from '@routes/transaction/schema';
import { ITransaction } from 'src/interfaces/transactionInterface';
import { requestValidator } from 'src/classes/requestValidator';
import moment, { now } from 'moment';

export class TransactionController {
  public constructor(private readonly _service: Service) {}

  // TODO Create new transaction
  // TODO Get transactions by month, day and year (default is month), category, expense || income || transfer, with pagination
  // TODO Get transaction stats by month, day and year i.e total income, total expense
  // TODO Get pending transactions and transfers
  // TODO Get transaction by transaction Id
  // TODO Edit transaction by Id
  // ? TODO Transfer amount to another account for self or other user ??? (payment???)
  // TODO Delete transaction by Id

  //register
  public registerTransaction: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    requestInterceptor(req);
    let validationBody = {
      required: req.body || req.params,
      body: {
        userId: req.body.user_id,
        accountId: req.body.account_id,
        categoryId: req.body.category_id,
        type: req.body.type, //expense, income or transfer
        amount: req.body.amount,
        reason: req.body.reason,
        description: req.body.description,
        dateTime: req.body.date_time,
        // //TODO Consider adding the fallowing
        // location: req.body.location,
        // recurrence: req.body.recurrence, //boolean
        // recurrenceInterval: req.body.recurrenceInterval, //monthly, daily, annual or custom (every n days, months, hours)
        // Notification ???
        // // TODO FE : Start recurrent expense and pay per interval
        // transferUserId: req.body.transferUserId,
        // transferAccountId: req.body.transferAccountId,
        // borrowUserId: req.body.borrowUserId,
        // borrowToReturnBy: req.body.borrowToReturnBy,
      },
      schema: registerTransactionSchema,
    };
    let result = requestValidator.validateRequest(res, validationBody);
    if (result) {
      let {
        userId,
        accountId,
        categoryId,
        type,
        amount,
        reason,
        description,
        dateTime,
      } = result.value;

      let created = new Date();
      if (!dateTime || moment(dateTime).isAfter(new Date())) dateTime = created;

      // TODO check if userId and accountId are valid...
      const newTransaction: ITransaction = {
        userId: new ObjectId(userId),
        accountId: new ObjectId(accountId),
        categoryId: new ObjectId(categoryId),
        type,
        amount,
        reason,
        description,
        created,
        dateTime,
      };
      let registeredTransaction = await this._service.registerTransaction(
        newTransaction
      );
      logger.infoData(registeredTransaction, 'registeredTransaction');
      if (registeredTransaction) {
        return ResponseBuilder.ok(
          {
            message: 'Successfully Registered',
            data: registeredTransaction,
          },
          res
        );
      } else {
        return ResponseBuilder.configurationError(
          ErrorCode.GeneralError,
          'Error registering transaction!',
          res
        );
      }
    }
  };

  //fetch all transaction
  //TODO add support for filtering by date (default by month)
  public getTransaction: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    requestInterceptor(req);
    let validationBody = {
      required: req.query ? true : false,
      body: {
        userId: req.query.user_id,
        id: req.query.id,
        accountId: req.query.account_id,
        page: req.query.page,
        pageLimit: req.query.page_limit,
        startDate: req.query.start_date,
        endDate: req.query.end_date,
        // TODO get transaction by type or reason
        // TODO get transaction by category
        type: req.query.type,
        reason: req.query.reason,
      },
      schema: fetchTransactionSchema,
    };
    let result = requestValidator.validateRequest(res, validationBody);
    if (result) {
      let {
        userId,
        id,
        accountId,
        page,
        pageLimit,
        type,
        reason,
        startDate,
        endDate,
      } = result.value;
      let formattedStartDate;
      let formattedEndDate;
      if (startDate) formattedStartDate = new Date(startDate);
      if (endDate) formattedEndDate = new Date(endDate);
      logger.infoData({
        startDate: formattedStartDate,
        endDate: formattedStartDate,
      });
      // TODO userId, accountId validate
      let transactions = await this._service.getTransaction(
        userId,
        id,
        accountId,
        page,
        pageLimit,
        formattedStartDate,
        formattedEndDate,
        type,
        reason
      );
      logger.infoData(transactions, 'All transaction');
      if (transactions) {
        return ResponseBuilder.ok(
          {
            message: 'Successfully Fetched',
            data: transactions.data,
            next: transactions.next,
            previous: transactions.previous,
          },
          res
        );
      } else {
        return ResponseBuilder.configurationError(
          ErrorCode.GeneralError,
          'Error fetching transactions!',
          res
        );
      }
    }
  };

  //Delete Transaction
  public deleteTransaction: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    requestInterceptor(req);
    let validationBody = {
      required: req.query ? true : false,
      body: {
        id: req.query.id,
      },
      schema: deleteTransactionSchema,
    };
    let result = requestValidator.validateRequest(res, validationBody);
    if (result) {
      let id = result.value.id;
      let deleted = await this._service.deleteTransaction(id);
      if (deleted) {
        return ResponseBuilder.ok(
          { message: 'Successfully Deleted', data: deleted },
          res
        );
      } else {
        return ResponseBuilder.configurationError(
          ErrorCode.GeneralError,
          'Error deleting transaction!',
          res
        );
      }
    }
  };

  //Edit Transaction
  public editTransaction: any = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    requestInterceptor(req);
    let validationBody = {
      required: req.body || req.params ? true : false,
      body: {
        id: req.body.id,
        categoryId: req.body.category_id,
        amount: req.body.amount,
        reason: req.body.reason,
        description: req.body.description,
      },
      schema: editTransactionSchema,
    };
    let result = requestValidator.validateRequest(res, validationBody);
    if (result) {
      let { id, categoryId, amount, reason, description } = result.value.id;
      //TODO check userId and accountId...

      // TODO check the update function ...
      const update: ITransaction = {
        id: new ObjectId(id),
        categoryId: new ObjectId(categoryId),
        amount: amount,
        reason: reason,
        description: description,
      };
      let updatedTransaction = await this._service.updateTransaction(
        id,
        update
      );
      logger.infoData(updatedTransaction, 'updatedTransaction');
      if (updatedTransaction) {
        return ResponseBuilder.ok(
          { message: 'Successfully updated', data: updatedTransaction },
          res
        );
      } else {
        return ResponseBuilder.configurationError(
          ErrorCode.GeneralError,
          'Error updating transaction!',
          res
        );
      }
    }
  };
}
