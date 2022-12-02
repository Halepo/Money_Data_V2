import { ResponseBuilder } from '../shared/response-builder';
import { requestInterceptor } from '../interceptors/interceptor';
import { logger } from '../classes/consoleLoggerClass';
import { ErrorCode } from '../shared/error-codes';
import { Service } from 'src/services';
import { loginSchema, registerSchema } from '../routes/auth/schema';
import e, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export class AuthController {
  public constructor(private readonly _service: Service) {}
  //login
  public login: any = async (req: Request, res: Response): Promise<void> => {
    requestInterceptor(req.body);
    try {
      if (req.body || req.params) {
        //get cookies
        const cookies = req.signedCookies;
        console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
        let validationBody = {
          email: req.body.email,
          password: req.body.password,
        };
        const result = loginSchema.validate(validationBody);
        logger.logData('validation result', result);
        if (!result.error) {
          logger.infoData(result.value);
          if (Object.keys(result.value).length === 0) {
            return ResponseBuilder.badRequest(
              ErrorCode.Invalid,
              'request body is required and must be not empty',
              res
            );
          }
          let email = result.value.email;
          let password = result.value.password;

          let loggedInUser = await this._service.loginUser(email, password);

          logger.infoData(loggedInUser, 'loggedInUser');

          if (loggedInUser) {
            let foundUser = loggedInUser.user;
            let { newRefreshToken } = loggedInUser;

            // if no refresh token in db and Check if we have same refresh token in DB
            let newRefreshTokenArray: string[] = !foundUser.refreshToken
              ? []
              : !cookies?.jwt
              ? foundUser.refreshToken
              : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

            if (cookies?.jwt) {
              /*
            Scenario added here:
                1) User logs in but never uses RT and does not logout
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
              const refreshToken = cookies.jwt;
              const foundToken = await this._service.findUserByRefreshToken({
                refreshToken,
              });

              // Detected refresh token reuse!
              if (!foundToken) {
                console.log('Attempted refresh token reuse at login!');
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
              }

              res.clearCookie('jwt', {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
              });
            }

            const result = await this._service.updateUserRefreshTokenArray(
              [...newRefreshTokenArray, newRefreshToken],
              foundUser._id
            );
            console.log(result);

            // Creates Secure Cookie with refresh token
            let cookieOptions = {
              maxAge: 1000 * 60 * 15, // would expire after 15 minutes
              httpOnly: true, // The cookie only accessible by the web server
              signed: true, // Indicates if the cookie should be signed
              secure: true,
              sameSite: 'none' as const,
            };

            res.cookie('jwt', newRefreshToken, cookieOptions);
            const { token } = loggedInUser;
            return ResponseBuilder.ok(
              { message: 'Successfully logged in', data: { token } },
              res
            );
          } else {
            return ResponseBuilder.notFound(
              '404',
              'Credentials do not match! Please check your email or password!',
              res
            );
          }
        } else {
          logger.infoData('error happened');
          return ResponseBuilder.badRequest(
            ErrorCode.Invalid,
            result.error.details[0].message,
            res
          );
        }
      } else {
        logger.errorData('body parameters not found');
        return ResponseBuilder.badRequest(
          ErrorCode.Invalid,
          'body parameters not found',
          res
        );
      }
    } catch (error) {
      logger.errorData(error);
      return ResponseBuilder.internalServerError(error, res);
    }
  };

  //refresh
  public refresh: any = async (req: Request, res: Response): Promise<void> => {
    requestInterceptor(req.body);
    try {
      logger.logData('Refreshing token...');
      const cookie = req.signedCookies;
      logger.infoData('cookie', cookie);
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        signed: true,
      });
      if (cookie.jwt) {
        const oldRefreshToken = cookie.jwt;
        let foundUser = await this._service.findUserByRefreshToken(
          oldRefreshToken
        );
        if (!foundUser) {
          jwt.verify(
            oldRefreshToken,
            process.env.TOKEN_KEY,
            async (err, decoded) => {
              if (err)
                return ResponseBuilder.forbidden(
                  ErrorCode.Forbidden,
                  'Forbidden request.',
                  res
                ); //Forbidden
              console.log('attempted refresh token reuse!');
              const hackedUser =
                await this._service.findExistingUserByEmailOrName(
                  decoded.userName,
                  ''
                );
              if (hackedUser) {
                console.log('hacked user', hackedUser);
                const result = await this._service.updateUserRefreshTokenArray(
                  [],
                  hackedUser._id
                );
                console.log(result);
              }
            }
          );
          return ResponseBuilder.forbidden(
            ErrorCode.Forbidden,
            'Forbidden request.',
            res
          ); //Forbidden;
        } else {
          let updatedUser = await this._service.refreshToken(cookie.jwt);
          if (updatedUser) {
            const { token, newRefreshToken } = updatedUser;
            // Creates Secure Cookie with refresh token
            let cookieOptions = {
              maxAge: 1000 * 60 * 15, // would expire after 15 minutes
              httpOnly: true, // The cookie only accessible by the web server
              signed: true, // Indicates if the cookie should be signed
              secure: true,
              sameSite: 'none' as const,
            };

            res.cookie('jwt', newRefreshToken, cookieOptions);
            return ResponseBuilder.ok(
              { message: 'Successfully refreshed', data: { token } },
              res
            );
          } else {
            return ResponseBuilder.forbidden(
              ErrorCode.Forbidden,
              'Forbidden, No user found with token: ',
              res
            );
          }
        }
      } else {
        return ResponseBuilder.badRequest(
          ErrorCode.Invalid,
          'No cookies in request.',
          res
        );
      }
    } catch (error) {
      logger.errorData(error);
      return ResponseBuilder.internalServerError(error, res);
    }
  };

  //register
  public logout: any = async (req: Request, res: Response): Promise<void> => {
    requestInterceptor(req.body);
    try {
      const cookie = req.signedCookies;
      logger.logData('logging out...');
      logger.infoData('cookie', cookie);
      if (cookie.jwt) {
        await this._service.logout(cookie.jwt);
        res.clearCookie('jwt', {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          signed: true,
        });
        return ResponseBuilder.ok('Logged Out Successfully', res);
      } else {
        return ResponseBuilder.badRequest(
          ErrorCode.Invalid,
          'Empty or no cookie received!',
          res
        );
      }
    } catch (error) {
      logger.errorData(error);
      return ResponseBuilder.internalServerError(error, res);
    }
  };

  //register
  public register: any = async (req: Request, res: Response): Promise<void> => {
    requestInterceptor(req.body);
    try {
      if (req.body || req.params) {
        let validationBody = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          passwordConfirmation: req.body.passwordConfirmation,
        };
        const result = registerSchema.validate(validationBody);
        logger.logData('validation result', result);
        if (!result.error) {
          logger.infoData(result.value);
          if (Object.keys(result.value).length === 0) {
            return ResponseBuilder.badRequest(
              ErrorCode.Invalid,
              'request body is required and must be not empty',
              res
            );
          }
          let name = result.value.name;
          let email = result.value.email;
          let password = result.value.password;
          let passwordConfirmation = result.value.passwordConfirmation;
          //find existing user for validation

          //check passwords match validation
          if (password === passwordConfirmation) {
            let existingUser =
              await this._service.findExistingUserByEmailOrName(name, email);
            if (!existingUser) {
              let registeredUser = await this._service.registerUser(
                name,
                email,
                password
              );
              logger.infoData(registeredUser, 'registeredUser');
              if (registeredUser) {
                return ResponseBuilder.ok(
                  { message: 'Successfully Registered', data: registeredUser },
                  res
                );
              } else {
                return ResponseBuilder.configurationError(
                  ErrorCode.GeneralError,
                  'Error registering user!',
                  res
                );
              }
            } else {
              logger.infoData('User already exist!');
              return ResponseBuilder.badRequest(
                ErrorCode.Invalid,
                'User already exist!',
                res
              );
            }
          } else {
            logger.infoData('Passwords do not match!');
            return ResponseBuilder.badRequest(
              ErrorCode.Invalid,
              'Passwords do not match!',
              res
            );
          }
        } else {
          logger.infoData('error happened');
          return ResponseBuilder.badRequest(
            ErrorCode.Invalid,
            result.error.details[0].message,
            res
          );
        }
      } else {
        logger.errorData('body parameters not found');
        return ResponseBuilder.badRequest(
          ErrorCode.Invalid,
          'body parameters not found',
          res
        );
      }
    } catch (error) {
      logger.errorData(error);
      return ResponseBuilder.internalServerError(error, res);
    }
  };
}
