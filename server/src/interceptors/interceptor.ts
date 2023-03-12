import { Request, Response } from 'express';
import { logger } from '../classes/consoleLoggerClass';

export const requestInterceptor = (req: Request) => {
  logger.logData('Request:', {
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    params: req.params,
    queryParams: req.query,
    cookies: JSON.parse(JSON.stringify(req.cookies)),
    signedCookies: JSON.parse(JSON.stringify(req.signedCookies)),
  });
};

export const responseInterceptor = (res: Response) => {
  logger.logData('Response:', res);
};
