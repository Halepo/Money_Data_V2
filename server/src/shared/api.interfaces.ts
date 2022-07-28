import { Response } from 'express';

import { ErrorResult } from './errors';

//the response type
export type ApiResponse = Response;

export interface ErrorResponseBody {
  error: ErrorResult;
}
