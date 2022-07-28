import { ApiCallback, ApiContext } from '../shared/api.interfaces';
import { ResponseBuilder } from '../shared/response-builder';
import { requestInterceptor } from '../interceptors/interceptor';
import { logger } from '../classes/consoleLoggerClass';
import { ErrorCode } from '../shared/error-codes';
import { Service } from 'src/services';
import { loginSchema } from '../routes/auth/schema'
import { Request, Response } from 'express';

export class AuthController {
    public constructor(private readonly _service: Service) { }
    public login: any = async (
        req: Request, res: Response
    ): Promise<void> => {
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

                    let loggedInUser = await this._service.login(
                        email,
                        password,
                    );

                    logger.infoData(loggedInUser, 'loggedInUser');

                    if (loggedInUser) {
                        return ResponseBuilder.ok(
                            { message: "Successfully logged in", data: loggedInUser },
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
}
