import { db } from 'src/config/database';
import { ObjectId } from 'bson';
import { logger } from '../classes/consoleLoggerClass';
import { ITransaction } from 'src/interfaces/transactionInterface';
import moment from 'moment';

export class TransactionRepository {
  public async registerTransaction(newTransaction: ITransaction): Promise<any> {
    logger.infoData('Validating Request');

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
    categoryId: string,
    page: number,
    pageLimit: number,
    startDate: Date,
    endDate: Date,
    type: string,
    currency: string,
    reason: string
  ): Promise<any> {
    logger.infoData('Fetching Transactions...');
    let fetchParams: any = {};
    if (id) fetchParams._id = new ObjectId(id);
    if (userId) fetchParams.userId = new ObjectId(userId);
    if (accountId) fetchParams.accountId = new ObjectId(accountId);
    if (categoryId) fetchParams.categoryId = new ObjectId(categoryId);
    if (type) fetchParams.type = type;
    if (currency) fetchParams.currency = currency;
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

    //TODO check currency issue ---

    let result = await db
      .collection('Transaction')
      .aggregate([
        {
          $match: fetchParams, // filter by fetchParams
        },
        {
          $lookup: {
            from: 'User',
            let: { userId: '$userId' },
            pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$userId'] } } }],
            as: 'user',
          },
        },
        {
          $lookup: {
            from: 'Account',
            let: { accountId: '$accountId' },
            pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$accountId'] } } }],
            as: 'account',
          },
        },
        {
          $lookup: {
            from: 'Category',
            let: { categoryId: '$categoryId' },
            pipeline: [
              { $match: { $expr: { $eq: ['$_id', '$$categoryId'] } } },
            ],
            as: 'category',
          },
        },
        {
          $skip: page, // skip page number of documents
        },
        {
          $limit: pageLimit, // limit number of documents per page
        },
      ])
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

  // [({
  //   _id: '63b5a35abc9679245e8bf10b',
  //   userId: '62e3928cc82243611c6ad6c1',
  //   accountId: '62e39ff42279827ce345c6bc',
  //   categoryId: '62e65bca55aacc2f09adc3a0',
  //   type: 'income',
  //   amount: 23000,
  //   reason: 'Demoz',
  //   description: 'payment form someone',
  //   created: '2023-01-04T16:03:38.943Z',
  //   dateTime: '2022-12-24T21:00:00.000Z',
  // },
  // {
  //   _id: '63b5a372bc9679245e8bf10c',
  //   userId: '62e3928cc82243611c6ad6c1',
  //   accountId: '62e39ff42279827ce345c6bc',
  //   categoryId: '62e65bca55aacc2f09adc3a0',
  //   type: 'income',
  //   amount: 23000,
  //   reason: 'Demoz',
  //   description: 'payment form someone',
  //   created: '2023-01-04T16:04:02.938Z',
  //   dateTime: '2022-11-24T21:00:00.000Z',
  // })];

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
