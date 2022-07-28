import { logger } from '../logger';

// @Todo : move this code to httpstatusCode constant file.
const httpStatusCode = {
  unAuthorized: 401,
  internalServerError: 500,
};
/**
 * Allows for simple header authorization
 * Reference services/docusign/src/libs/lambda.ts for an example
 *
 * @param {*} args Specify headers that you expect the client to send
 * @returns {*}  {MiddlewareObject<any, any>}
 */
export function pcAuthorizationMiddleware(args) {
  return {
    before: async (handler) => {
      try {
        logger.info('[authorizationMiddleware] executed!');
        const { headerLookup } = args;
        const { headers = {}, path = '' } = handler.event;
        logger.info(`[authorizationMiddleware] path ${path}`);
        if (headerLookup in headers) {
          if (headers[headerLookup].trim() !== args.apiKey.trim()) {
            logger.error(
              `[authorizationMiddleware] ${headers[headerLookup]} invalid key found in header`,
            );
            handler.callback(null, {
              statusCode: httpStatusCode.unAuthorized,
              body: JSON.stringify({
                message: `${headers[headerLookup]} invalid key found in header`,
              }),
            });
          }
        } else {
          logger.error(
            `[authorizationMiddleware] ${headerLookup} not found in header`,
          );
          handler.callback(null, {
            statusCode: httpStatusCode.unAuthorized,
            body: JSON.stringify({
              message: `${headerLookup} not found in header`,
            }),
          });
        }
      } catch (error) {
        logger.error(
          `[authorizationMiddleware] error :${error.message} `,
        );
        handler.callback(null, {
          statusCode: httpStatusCode.internalServerError,
          body: JSON.stringify(
            `Something went wrong ! error : ${error.message}`,
          ),
        });
      }
    },
  };
}
