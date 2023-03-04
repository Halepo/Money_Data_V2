import { db } from 'src/config/database';
import { ObjectId } from 'bson';
import { logger } from '../classes/consoleLoggerClass';
import { ITransaction } from 'src/interfaces/transactionInterface';
import moment from 'moment';

export class TransactionRepository {
  public async registerTransaction(newTransaction: ITransaction): Promise<any> {
    logger.infoData('Registering transaction..');
    let result = await db
      .collection('Transaction')
      .insertOne(newTransaction, { upsert: true, returnOriginal: false });
    if (result.ops[0]) return result.ops[0];
  }

  public async fetchTransaction(
    userId: string,
    id: string,
    accountId: string,
    page: number,
    pageLimit: number,
    startDate: Date,
    endDate: Date,
    type: string,
    reason: string
  ): Promise<any> {
    logger.infoData('Fetching Transactions...');
    let fetchParams: any = {};
    if (id) fetchParams._id = new ObjectId(id);
    if (userId) fetchParams.userId = new ObjectId(userId);
    if (accountId) fetchParams.accountId = new ObjectId(accountId);
    if (type) fetchParams.type = type;
    if (reason) fetchParams.reason = reason;
    // TODO Test this
    if (startDate && moment(startDate).isValid())
      fetchParams.dateTime = { ...fetchParams.dateTime, $gte: startDate };
    if (endDate && moment(endDate).isValid())
      fetchParams.dateTime = { ...fetchParams.dateTime, $lte: endDate };

    if (!page || page <= 0) page = 1;
    if (!pageLimit || pageLimit <= 0) pageLimit = 10;

    const startIndex = (page - 1) * pageLimit;
    const endIndex = page * pageLimit;

    let results: { data?: Object; next?: Object; previous?: Object } = {};

    logger.infoData(fetchParams);

    let result = await db
      .collection('Transaction')
      .find(fetchParams)
      .limit(pageLimit)
      .skip(startIndex)
      .toArray();

    let resultCount = await db
      .collection('Transaction')
      .find(fetchParams)
      .count();

    if (result) {
      if (endIndex < resultCount) {
        results.next = {
          page: page + 1,
          limit: pageLimit,
          count: resultCount,
        };
      }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: pageLimit,
        };
      }
      results.data = result;
      return results;
    }
  }

  public async updateTransaction(
    id: string,
    update: ITransaction
  ): Promise<any> {
    logger.infoData('Fetching Transaction...');
    let result = await db.collection('Transaction').updateOne(
      { _id: new ObjectId(id) },
      { $set: { reason: update.reason, amount: update.amount } },
      {
        returnOriginal: false,
        upsert: true,
      }
    );
    logger.infoData('Successfully Updated!');
    if (result) return update;
  }

  public async deleteTransaction(id: string): Promise<any> {
    logger.infoData('Deleting Transactions...');
    let result = await db
      .collection('Transaction')
      .deleteOne({ _id: new ObjectId(id) });
    logger.infoData('Successfully Deleted!');
    if (result.deletedCount === 1) {
      logger.infoData('Successfully Deleted!');
      return {
        message: 'Successfully Deleted!',
      };
    }
  }
}
