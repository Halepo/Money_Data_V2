import { AuthRepository } from 'src/repositories/AuthRepository';
import { AccountRepository } from 'src/repositories/AccountRepository';
import { TransactionRepository } from 'src/repositories/TransactionRepository';
import { CategoryRepository } from 'src/repositories/CategoryRepository';
import { logger } from '../classes/consoleLoggerClass';
import { IAccount } from 'src/interfaces/accountInterface';
import { ITransaction } from 'src/interfaces/transactionInterface';
import { ICategory } from 'src/interfaces/categoryInterface';

export class Service {
  //Auth ///
  private AuthRepository = new AuthRepository();
  private AccountRepository = new AccountRepository();
  private TransactionRepository = new TransactionRepository();
  private CategoryRepository = new CategoryRepository();

  public async loginUser(email: string, password: string) {
    try {
      const loggedInUser = await this.AuthRepository.login(email, password);
      if (loggedInUser) return loggedInUser;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async updateUserRefreshTokenArray(
    refreshTokenArray: string[],
    userId: string
  ) {
    try {
      const User = await this.AuthRepository.updateUserRefreshTokenArray(
        refreshTokenArray,
        userId
      );
      if (User) return User;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async registerUser(name: string, email: string, password: string) {
    try {
      const registeredUser = await this.AuthRepository.register(
        name,
        email,
        password
      );
      if (registeredUser) return registeredUser;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async refreshToken(oldRefreshToken: string) {
    try {
      const newRefreshToken = await this.AuthRepository.refreshToken(
        oldRefreshToken
      );
      if (newRefreshToken) return newRefreshToken;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async logout(refreshToken: string) {
    try {
      const updatedUser = await this.AuthRepository.logout(refreshToken);
      if (updatedUser) return updatedUser;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async findUserByEmailOrName(name: string, email: string) {
    try {
      const existingUser = this.AuthRepository.findUserByEmailOrName(
        name,
        email
      );
      if (existingUser) return existingUser;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }

  public async findUserByRefreshToken(refreshToken: { refreshToken: string }) {
    try {
      const User = this.AuthRepository.findUserByRefreshToken(refreshToken);
      if (User) return User;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }

  //Account ///
  public async createAccount(newAccount: IAccount) {
    try {
      const existingUser = this.AccountRepository.createAccount(newAccount);
      if (existingUser) return existingUser;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async findAccountByNumberOrName(userId, name: string, number: number) {
    try {
      const existingUser = this.AccountRepository.findAccountByNumberOrName(
        userId,
        name,
        number
      );
      if (existingUser) return existingUser;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }

  public async getAccounts(
    userId: string,
    id,
    balance,
    name,
    bank,
    number,
    description
  ) {
    try {
      const allAccounts = this.AccountRepository.getAccounts(
        userId,
        id,
        balance,
        name,
        bank,
        number,
        description
      );
      if (allAccounts) return allAccounts;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }

  //Transaction ///
  public async registerTransaction(newTransaction: ITransaction) {
    try {
      const registeredTransaction =
        this.TransactionRepository.registerTransaction(newTransaction);
      if (registeredTransaction) return registeredTransaction;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async getTransaction(
    userId: string,
    id: string,
    accountId: string,
    page: number,
    pageLimit: number,
    startDate: Date,
    endDate: Date,
    type: string,
    reason: string
  ) {
    try {
      const registeredTransaction = this.TransactionRepository.fetchTransaction(
        userId,
        id,
        accountId,
        page,
        pageLimit,
        startDate,
        endDate,
        type,
        reason
      );
      if (registeredTransaction) return registeredTransaction;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async deleteTransaction(id: string) {
    try {
      const deletedTransaction =
        this.TransactionRepository.deleteTransaction(id);
      if (deletedTransaction) return deletedTransaction;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }

  public async updateTransaction(id: string, update: ITransaction) {
    try {
      const deletedTransaction = this.TransactionRepository.updateTransaction(
        id,
        update
      );
      if (deletedTransaction) return deletedTransaction;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }

  //Category ///
  public async createCategory(newIncome: ICategory) {
    try {
      const registeredTransaction =
        this.CategoryRepository.registerCategory(newIncome);
      if (registeredTransaction) return registeredTransaction;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async getCategory(id, category, description, categoryFor) {
    try {
      const registeredTransaction = this.CategoryRepository.fetchCategory(
        id,
        category,
        description,
        categoryFor
      );
      if (registeredTransaction) return registeredTransaction;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async deleteCategory(id: string) {
    try {
      const deletedIncome = this.CategoryRepository.deleteCategory(id);
      if (deletedIncome) return deletedIncome;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async editCategory(id: string, update: ICategory) {
    try {
      const updatedCategory = this.CategoryRepository.editCategory(id, update);
      if (updatedCategory) return updatedCategory;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
}
