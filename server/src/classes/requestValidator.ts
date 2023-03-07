import { ObjectId } from 'bson';
import { db } from 'src/config/database';
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

  async validateCollectionItems(collections: string[], ids: ObjectId[]) {
    // Define a function that queries a collection by id and returns a document
    async function findDocument(collectionName, id) {
      let document = await db
        .collection(collectionName)
        .findOne({ _id: new ObjectId(id) });
      return document;
    }

    logger.infoData('Validating Request');
    // Use promise.all to query all collections in parallel and store the results in an array
    let results = await Promise.all(
      collections.map((collection, index) =>
        findDocument(collection, ids[index])
      )
    );

    return results;
  }
}
export const requestValidator = new RequestValidator();
