import { AuthRepository } from 'src/repositories/AuthRepository';
import { AccountRepository } from 'src/repositories/AccountRepository';
import { ExpenseRepository } from 'src/repositories/ExpenseRepository';
import { IncomeRepository } from 'src/repositories/IncomeRepository';
import { CategoryRepository } from 'src/repositories/CategoryRepository';
import { logger } from '../classes/consoleLoggerClass';
import { IAccount } from 'src/interfaces/account';
import { IExpense } from 'src/interfaces/expense';
import { ICategory } from 'src/interfaces/category';
import { IIncome } from 'src/interfaces/income';

export class Service {
  //Auth ///
  private AuthRepository = new AuthRepository();
  private AccountRepository = new AccountRepository();
  private ExpenseRepository = new ExpenseRepository();
  private IncomeRepository = new IncomeRepository();
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
  public async findExistingUserByEmailOrName(name: string, email: string) {
    try {
      const existingUser = this.AuthRepository.findExistingUserByEmailOrName(
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
  public async findExistingAccountByNumberOrName(
    userId,
    name: string,
    number: number
  ) {
    try {
      const existingUser =
        this.AccountRepository.findExistingAccountByNumberOrName(
          userId,
          name,
          number
        );
      if (existingUser) return existingUser;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }

  public async getAllAccounts(userId: string) {
    try {
      const allAccounts = this.AccountRepository.getAllAccounts(userId);
      if (allAccounts) return allAccounts;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }

  //Expense ///
  public async registerExpense(newExpense: IExpense) {
    try {
      const registeredExpense =
        this.ExpenseRepository.registerExpense(newExpense);
      if (registeredExpense) return registeredExpense;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async getAllExpense(userId: string, accountId: string) {
    try {
      const registeredExpense = this.ExpenseRepository.fetchAllExpense(
        userId,
        accountId
      );
      if (registeredExpense) return registeredExpense;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async deleteExpense(id: string) {
    try {
      const deletedExpense = this.ExpenseRepository.deleteExpense(id);
      if (deletedExpense) return deletedExpense;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }

  //Income ///
  public async registerIncome(newIncome: IIncome) {
    try {
      const registeredExpense = this.IncomeRepository.registerIncome(newIncome);
      if (registeredExpense) return registeredExpense;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async getAllIncome(userId: string, accountId: string) {
    try {
      const registeredExpense = this.IncomeRepository.fetchAllIncome(
        userId,
        accountId
      );
      if (registeredExpense) return registeredExpense;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async deleteIncome(id: string) {
    try {
      const deletedIncome = this.IncomeRepository.deleteIncome(id);
      if (deletedIncome) return deletedIncome;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async updateIncome(id: string, update: IIncome) {
    try {
      const deletedIncome = this.IncomeRepository.updateIncome(id, update);
      if (deletedIncome) return deletedIncome;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  //Category ///
  public async createCategory(newIncome: ICategory) {
    try {
      const registeredExpense =
        this.CategoryRepository.registerCategory(newIncome);
      if (registeredExpense) return registeredExpense;
    } catch (error) {
      logger.errorData('error data:', error);
    }
  }
  public async getAllCategory() {
    try {
      const registeredExpense = this.CategoryRepository.fetchAllCategory();
      if (registeredExpense) return registeredExpense;
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
