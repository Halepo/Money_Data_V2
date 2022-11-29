import { db } from 'src/config/database';
import { logger } from '../classes/consoleLoggerClass';
import { IIncome } from 'src/interfaces/income';
import { ObjectId } from 'bson';

export class IncomeRepository {
  public async registerIncome(newIncome: IIncome): Promise<any> {
    logger.infoData('Registering Income..');
    let result = await db
      .collection('Income')
      .insertOne(newIncome, { upsert: true, returnOriginal: false });

    logger.infoData(result, 'Registered Income');
    if (result.ops[0]) return result.ops[0];
  }

  public async fetchAllIncome(userId: string, accountId: string): Promise<any> {
    logger.infoData('Fetching Incomes...');
    let fetchParams: any = { userId: new ObjectId(userId) };
    if (accountId) {
      fetchParams.accountId = new ObjectId(accountId);
    }
    let result = await db.collection('Income').find(fetchParams).toArray();

    logger.infoData(result, 'All Income');
    if (result) return result;
  }
  public async deleteIncome(id: string): Promise<any> {
    logger.infoData('Fetching Incomes...');
    let result = await db
      .collection('Income')
      .deleteOne({ _id: new ObjectId(id) });
    logger.infoData('Successfully Deleted!');
    if (result.deletedCount === 1) {
      logger.infoData('Successfully Deleted!');
      return {
        message: 'Successfully Deleted!',
      };
    }
  }

  public async updateIncome(id: string, update: IIncome): Promise<any> {
    logger.infoData('Fetching Incomes...');
    let result = await db.collection('Income').updateOne(
      { _id: new ObjectId(id) },
      { $set: { reason: update.reason, amount: update.amount } },
      {
        returnOriginal: false,
        upsert: true,
      }
    );
    logger.infoData('Successfully Updated!');
    logger.infoData(result, 'Updated Category');
    if (result) return update;
  }
}
