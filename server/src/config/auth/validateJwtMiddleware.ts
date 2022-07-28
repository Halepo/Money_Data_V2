import { logger } from '../logger';
import jwt from "jsonwebtoken";
import { createConn, db } from "../database"

// @Todo : move this code to httpstatusCode constant file.
const httpStatusCode = {
  unAuthorized: 401,
  badRequest: 400,
  internalServerError: 500,
};
/**
 * Allows for JWT header authorization
 *
 *
 * @returns {*}  {MiddlewareObject<any, any>}
 */
export function pcValidateJwtMiddleware() {
  return {
    before: async (handler) => {
      handler.context.callbackWaitsForEmptyEventLoop = false
      try {
        logger.info(
          '[validateJWTMiddleware] executed',
        );
        const headerLookup = "Authorization";
        const { headers = {}, path = '' } = handler.event;
        logger.info(`[validateJWTMiddleware] path ${path}`);
        if (headerLookup in headers) {
          let bearerToken = headers[headerLookup].split(' ');
          logger.error(`[validateJWTMiddleware] ${bearerToken} bearer token`);
          if (bearerToken[0] === "Bearer") {
            let token = bearerToken[1];
            var decodedToken = jwt.decode(token, { complete: true });
            logger.info(decodedToken, "decoded token");
            if (decodedToken && decodedToken.header.alg === "RS256") {
              // get secret form .env
              const secretOrPublicKey = process.env.JWT_SECRET;
              logger.info(secretOrPublicKey, "secretOrPublicKey");
              await jwt.verify(token, secretOrPublicKey, async function (error, decoded) {
                logger.info(decoded, "decoded");
                if (error) {
                  logger.error(error, "error");
                  handler.callback(null, {
                    statusCode: httpStatusCode.unAuthorized,
                    body: JSON.stringify({
                      "message": error.message,
                      "errorCode": error.name
                    }),
                  });
                  throw error;
                } else {
                  logger.info("create connection");
                  await createConn();
                  logger.info(decoded, "decoded token");
                  //check for user
                  let user = await db.collection('User').findOne({ userId: decoded.sub });
                  logger.info(user, "user data");
                  if (user) {
                    handler.event.userInfo = user;
                  }
                }
              });
            } else {
              logger.info("invalid algorithm");
              handler.callback(null, {
                statusCode: httpStatusCode.unAuthorized,
                body: JSON.stringify({
                  "message": `invalid algorithm or invalid jwt`,
                  "errorCode": "JsonWebTokenError"
                })
              });
              return handler.context.fail;
            }
          } else {
            logger.error(
              `[validateJWTMiddleware] Bad authentication header`,
            );
            handler.callback(null, {
              statusCode: httpStatusCode.badRequest,
              body: JSON.stringify({
                "message": "Bad HTTP authentication header format",
                "errorCode": "Bearer"
              })
            });
            return handler.context.fail;
          }
        } else {
          logger.error(
            `[validateJWTMiddleware] ${headerLookup} not found in header`,
          );
          handler.callback(null, {
            statusCode: httpStatusCode.unAuthorized,
            body: JSON.stringify({
              "message": "missing authentication",
              "errorCode": "Unauthorized"
            })
          });
          return handler.context.fail;
        }
      } catch (error) {
        logger.error(
          `[validateJWTMiddleware] error :${error.message} `,
        );
        handler.callback({
          statusCode: httpStatusCode.internalServerError,
          body: JSON.stringify({
            "message": "internal server error",
            "errorCode": "internalServerError"
          })
        });
        return handler.context.fail;
      }
    }
  }
}
