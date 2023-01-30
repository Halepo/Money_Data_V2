import { db } from 'src/config/database';
import { ObjectId } from 'bson';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { logger } from '../classes/consoleLoggerClass';

const User = require('../models/User');

//check the interface implementation.... //implements IProgram<Program>
export class AuthRepository {
  public async anotherOne(email: string, password: string): Promise<any> {
    logger.infoData('Logging in..');
    let result = await db.collection('Program').findOneAndUpdate(
      {
        _id: new ObjectId('000'),
      },
      {
        $push: {
          something: 'something',
        },
      },
      { upsert: true, returnOriginal: false }
    );
    return result;
  }

  public async login(email: string, password: string): Promise<any> {
    logger.infoData('Logging in..');
    let user = await db.collection('User').findOne({ email: email });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create tokens
      const token = jwt.sign(
        { user_id: user._id, userName: user.name, role: user.role, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '5h',
        }
      );
      const newRefreshToken = jwt.sign(
        { user_id: user._id },
        process.env.TOKEN_KEY,
        {
          expiresIn: '24h',
        }
      );
      let resUser = { user, token, newRefreshToken };
      return resUser;
    }
  }

  public async updateUserRefreshTokenArray(
    refreshTokenArray: string[],
    userId
  ): Promise<any> {
    let User = await db.collection('User').findOneAndUpdate(
      {
        _id: new ObjectId(userId),
      },
      {
        $set: {
          refreshToken: refreshTokenArray,
        },
      },
      { upsert: true, returnDocument: 'after' }
    );
    console.log(User.value);
    return User.value;
  }

  public async refreshToken(oldRefreshToken: string): Promise<any> {
    console.log('oldRefreshToken', oldRefreshToken);
    let User = await db
      .collection('User')
      .findOne({ refreshToken: oldRefreshToken });
    console.log('Found user with this refresh token: ', User);

    const { user_id } = jwt.decode(oldRefreshToken);

    if (User) {
      const { name, role, email } = User;
      const filteredRefreshToken = User.refreshToken
        ? User.refreshToken.filter((token) => token != oldRefreshToken)
        : [];
      const newRefreshToken = jwt.sign(
        { user_id: user_id },
        process.env.TOKEN_KEY,
        {
          expiresIn: '24h',
        }
      );
      filteredRefreshToken.push(newRefreshToken);
      let updatedUser = await db.collection('User').findOneAndUpdate(
        { refreshToken: oldRefreshToken },
        {
          $set: {
            refreshToken: filteredRefreshToken,
          },
        },
        { upsert: true, returnDocument: 'after' }
      );
      if (updatedUser.value) {
        console.log('Updated User', updatedUser.value);
        // Create tokens
        const token = jwt.sign(
          { user_id: user_id, userName: name, role: role, email: email },
          process.env.TOKEN_KEY,
          {
            expiresIn: '5h',
          }
        );
        let resUser = { user: updatedUser.value, token, newRefreshToken };
        return resUser;
      }
    }
  }

  public async logout(refreshToken: string): Promise<any> {
    let User = await db
      .collection('User')
      .findOne({ refreshToken: refreshToken });

    console.log('Logging out user:', User);

    if (User) {
      const filteredRefreshTokenArray = User.refreshToken.filter(
        (token) => token != refreshToken
      );
      let updatedUser = db.collection('User').findOneAndUpdate(
        { refreshToken: refreshToken },
        {
          $set: {
            refreshToken: filteredRefreshTokenArray,
          },
        },
        { upsert: true, returnDocument: 'after' }
      );
      return updatedUser.value;
    }
  }

  public async register(
    name: string,
    email: string,
    password: string
  ): Promise<any> {
    logger.infoData('Registering user...');
    let encryptedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name: name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      created: new Date().toISOString(),
    };

    // Create user in our database
    const options = { upsert: true, returnDocument: 'after' };
    const registeredUser = await db
      .collection('User')
      .insertOne(userData, options);

    //the data will be returned in ops[0]
    if (registeredUser.ops[0]) {
      let result = registeredUser.ops[0];
      // Create tokens
      const token = jwt.sign(
        { user_id: result._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '5h',
        }
      );
      const refreshToken = jwt.sign(
        { user_id: result._id },
        process.env.TOKEN_KEY,
        {
          expiresIn: '24h',
        }
      );

      // save token
      result.token = token;

      // save refresh token
      result.refreshToken = refreshToken;

      // return new user
      return result;
    }
  }

  public async findExistingUserByEmailOrName(
    name: string,
    email: string
  ): Promise<any> {
    logger.infoData(
      `Finding existing user by number [${email ? email : ''}] or name [${
        name ? name : ''
      }]...`
    );
    let existingAccount = await db
      .collection('User')
      .findOne({ $or: [{ name: name }, { email: email }] });
    if (existingAccount) return existingAccount;
  }

  public async findUserById(id: ObjectId): Promise<any> {
    logger.infoData(`Finding user by id [${id}]...`);
    let user = await db.collection('User').findOne({ _id: id });
    if (user) return user;
  }

  public async findUserByRefreshToken(refreshToken: {
    refreshToken: string;
  }): Promise<any> {
    logger.infoData(
      `Finding user by refreshToken [${JSON.stringify(refreshToken)}]...`
    );
    let user = await db
      .collection('User')
      .findOne({ refreshToken: refreshToken.refreshToken });
    if (user) return user;
  }
}
