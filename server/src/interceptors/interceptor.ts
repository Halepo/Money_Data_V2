import { Request, Response } from "express";
import { logger } from "../classes/consoleLoggerClass";

export const requestInterceptor = (req: Request) => {
    logger.logData("Request:", req);
}

export const responseInterceptor = (res: Response) => {
    logger.logData("Response:", res);
}