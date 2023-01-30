import { ErrorCode } from 'src/shared/error-codes';
import { ResponseBuilder } from 'src/shared/response-builder';
import { logger } from './consoleLoggerClass';

type IValidation = {
  required: boolean;
  body: Object;
  schema: any;
};

class RequestValidator {
  validateRequest(res, validationBody: IValidation) {
    try {
      if (validationBody.required) {
        const result = validationBody.schema.validate(validationBody.body);
        logger.logData('validation result', result);
        if (!result.error) {
          //no validation error
          logger.infoData(result.value);
          if (Object.keys(result.value).length === 0) {
            return ResponseBuilder.badRequest(
              ErrorCode.Invalid,
              'request body is required and must be not empty',
              res
            );
          } else {
            //all good
            return result;
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
        logger.errorData('request parameters or body not found');
        return ResponseBuilder.badRequest(
          ErrorCode.Invalid,
          'Request parameters or body not found',
          res
        );
      }
    } catch (error) {
      logger.errorData(error);
      return ResponseBuilder.internalServerError(error, res);
    }
  }
}
export const requestValidator = new RequestValidator();
