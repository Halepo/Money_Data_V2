import { NextFunction, Request, Response } from "express";
import { logger } from "src/classes/consoleLoggerClass";
import { HttpStatusCode } from "src/shared/http-status-codes";

import jwt from 'jsonwebtoken'
import { db } from "src/config/database";
import { ObjectId } from "bson";
/**
 * Allows for simple header authorization
 */
export async function isAuthorized(req: Request, res: Response, next: NextFunction) {
  try {
    logger.infoData('[authorizationMiddleware] executed!');
    const bearerToken = req.headers["authorization"];
    if (bearerToken) {
      const token = bearerToken.split(' ')[1]
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const requestUser = decoded
      console.log(requestUser, 'request user')

      const user = await db.collection('User').findOne({ _id: new ObjectId(requestUser.user_id) })

      if (user) {
        logger.infoData(`Authorized for user ${user._id}`)
        return next();
      } else {
        logger.errorData('Authorization Error!  No/invalid user!')
        res.status(HttpStatusCode.UnAuthorized).json({
          message: "Authorization Error!  No/invalid user!",
        });
        return
      }
    } else {
      //no barrier token
      logger.errorData(
        `Authorization Error!  No token!`,
      );
      res.status(HttpStatusCode.UnAuthorized).json({
        message: "Authorization Error!  No token!",
      });
    }
  } catch (error) {
    logger.errorData(
      `Authorization Error! ${error.message} `,
    );

    res.status(HttpStatusCode.UnAuthorized).json({
      message: `Authorization Error! ${error.message}`
    });
  }
}
