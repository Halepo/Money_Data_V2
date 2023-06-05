import { ObjectId } from "bson";
import { ResponseBuilder } from "../shared/response-builder";
import { requestInterceptor } from "../interceptors/interceptor";
import { logger } from "../classes/consoleLoggerClass";
import { ErrorCode } from "../shared/error-codes";
import { Service } from "src/services";
import { Request, Response } from "express";
import {
  deleteTransactionSchema,
  editTransactionSchema,
  fetchTransactionSchema,
  registerTransactionSchema,
} from "@routes/transaction/schema";
import { ITransaction } from "src/interfaces/transactionInterface";
import { requestValidator } from "src/classes/requestValidator";
import moment, { now } from "moment";
import { db } from "src/config/database";

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
        currency: req.body.currency,
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
      try {
        let {
          userId,
          accountId,
          categoryId,
          type,
          amount,
          currency,
          reason,
          description,
          dateTime,
        } = result.value;

        let created = new Date();
        if (!dateTime || moment(dateTime).isAfter(new Date()))
          dateTime = created;

        // TODO check if userId and accountId are valid...DONE
        const newTransaction: ITransaction = {
          userId: new ObjectId(userId),
          accountId: new ObjectId(accountId),
          categoryId: new ObjectId(categoryId),
          type,
          amount,
          currency,
          reason,
          description,
          created,
          dateTime,
        };

        // Define an array of collections and ids
        let collections = ["User", "Account", "Category"];
        let ids = [
          newTransaction.userId,
          newTransaction.accountId,
          newTransaction.categoryId,
        ];

        let results = await requestValidator.validateCollectionItems(
          collections,
          ids
        );

        // Destructure the results array into variables
        let [user, account, category] = results;

        // Check if any of the variables is null or undefined
        if (!user || !account || !category) {
          // Throw an error with the name of the missing variable
          let missingVariable = [user, account, category].findIndex(
            (element) => !element
          );
          throw new Error(`Invalid ${collections[missingVariable]} ID`);
        } else if (category.transactionType != newTransaction.type) {
          throw new Error(
            `Category is for ${category.transactionType}. Please change!`
          );
        } else if (
          category.transactionType != "income" &&
          account.accountBalance < newTransaction.amount
        ) {
          //will do currency conversion here
          throw new Error(
            `Amount is more than what you have in that account i.e ${account.accountBalance} ${account.defaultCurrency}!`
          );
        } else {
          //add or subtract from account
          let newAccountBalance = 0;
          if (category.transactionType == "income") {
            newAccountBalance = account.accountBalance += newTransaction.amount;
          } else {
            newAccountBalance = account.accountBalance -= newTransaction.amount;
          }

          account = await db
            .collection("Account")
            .findOneAndUpdate(
              { _id: new ObjectId(account._id) },
              { $set: { accountBalance: newAccountBalance } }
            );
          logger.infoData("Altered Account : ", account);
        }

        let registeredTransaction = await this._service.registerTransaction(
          newTransaction
        );
        logger.infoData(registeredTransaction, "registeredTransaction");
        if (registeredTransaction) {
          return ResponseBuilder.ok(
            {
              message: "Successfully Registered",
              data: registeredTransaction,
            },
            res
          );
        } else {
          throw new Error("Error registering transaction!");
        }
      } catch (error) {
        return ResponseBuilder.configurationError(
          ErrorCode.GeneralError,
          error.message,
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
        categoryId: req.query.category_id,
        page: req.query.page,
        pageLimit: req.query.page_limit,
        startDate: req.query.start_date,
        endDate: req.query.end_date,
        // TODO get transaction by type or reason
        // TODO get transaction by category
        type: req.query.type,
        currency: req.query.currency,
        reason: req.query.reason,
      },
      schema: fetchTransactionSchema,
    };
    let result = requestValidator.validateRequest(res, validationBody);
    if (result) {
      try {
        let {
          userId,
          id,
          accountId,
          categoryId,
          page,
          pageLimit,
          type,
          currency,
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
          categoryId,
          page,
          pageLimit,
          formattedStartDate,
          formattedEndDate,
          type,
          currency,
          reason
        );
        logger.infoData(transactions, "All transaction");
        if (transactions) {
          return ResponseBuilder.ok(
            {
              message: "Successfully Fetched",
              data: transactions.data,
              next: transactions.next,
              previous: transactions.previous,
            },
            res
          );
        } else {
          return ResponseBuilder.configurationError(
            ErrorCode.GeneralError,
            "Error fetching transactions!",
            res
          );
        }
      } catch (error) {
        return ResponseBuilder.internalServerError(error, error.message);
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
          { message: "Successfully Deleted", data: deleted },
          res
        );
      } else {
        return ResponseBuilder.configurationError(
          ErrorCode.GeneralError,
          "Error deleting transaction!",
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
      logger.infoData(updatedTransaction, "updatedTransaction");
      if (updatedTransaction) {
        return ResponseBuilder.ok(
          { message: "Successfully updated", data: updatedTransaction },
          res
        );
      } else {
        return ResponseBuilder.configurationError(
          ErrorCode.GeneralError,
          "Error updating transaction!",
          res
        );
      }
    }
  };
}
