import { ResponseBuilder } from '../shared/response-builder';
import { requestInterceptor } from '../interceptors/interceptor';
import { logger } from '../classes/consoleLoggerClass';
import { ErrorCode } from '../shared/error-codes';
import { Service } from 'src/services';
import { loginSchema, registerSchema } from '../routes/auth/schema';
import { Request, Response } from 'express';

export class AuthController {
  public constructor(private readonly _service: Service) {}
  //login
  public login: any = async (req: Request, res: Response): Promise<void> => {
    requestInterceptor(req.body);
    try {
      if (req.body || req.params) {
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
            //add cookie
            let options = {
              maxAge: 1000 * 60 * 15, // would expire after 15 minutes
              httpOnly: true, // The cookie only accessible by the web server
              signed: true, // Indicates if the cookie should be signed
            };

            res.cookie('Token', loggedInUser.refreshToken, options);
            const { user, token } = loggedInUser;
            return ResponseBuilder.ok(
              { message: 'Successfully logged in', data: { user, token } },
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
