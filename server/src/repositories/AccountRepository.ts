import { db } from 'src/config/database';
import { logger } from '../classes/consoleLoggerClass';
import { IAccount } from 'src/interfaces/accountInterface';
import { ObjectId } from 'bson';

export class AccountRepository {
  public async createAccount(newAccount: IAccount): Promise<any> {
    logger.infoData('Registering Account..');
    let result = await db
      .collection('Account')
      .insertOne(newAccount, { upsert: true, returnOriginal: false });

    if (result.ops[0]) return result.ops[0];
  }

  public async findExistingAccountByNumberOrName(
    userId: string,
    name: string,
    number: number
  ): Promise<any> {
    logger.infoData(
      `Finding existing user [${userId}] by number [${
        number ? number : ''
      }] or name [${name ? name : ''}]...`
    );
    let existingAccount = await db.collection('Account').findOne({
      userId: new ObjectId(userId),
      $or: [{ accountName: name }, { accountNumber: number }],
    });
    if (existingAccount) return existingAccount;
  }

  public async getAllAccounts(userId: string): Promise<any> {
    logger.infoData(`Finding all accounts for [${userId}]`);
    let allAccounts = await db
      .collection('Account')
      .find({ userId: new ObjectId(userId) })
      .toArray();
    if (allAccounts) return allAccounts;
  }
}
