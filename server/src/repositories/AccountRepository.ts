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

  public async findAccountByNumberOrName(
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

  public async getAccounts(
    userId: string,
    id,
    balance,
    name,
    bank,
    number,
    description
  ): Promise<any> {
    let fetchParams: any = { userId: new ObjectId(userId) };
    if (id) fetchParams._id = new ObjectId(id);
    if (balance) fetchParams.balance = Number(balance);
    if (name) fetchParams.accountName = name;
    if (bank) fetchParams.bank = bank;
    if (number) fetchParams.accountNumber = Number(number);
    if (description) fetchParams.description = description;

    logger.infoData(`Finding all accounts ${JSON.stringify(fetchParams)}`);
    let allAccounts = await db
      .collection('Account')
      .find(fetchParams)
      .toArray();
    if (allAccounts) return allAccounts;
  }
}
