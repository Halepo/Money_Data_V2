import { ApiResponse, ErrorResponseBody } from './api.interfaces';
import { ErrorCode } from './error-codes';
import {
  BadRequestResult,
  ConfigurationErrorResult,
  ErrorResult,
  ForbiddenResult,
  InternalServerErrorResult,
  NotFoundResult,
  UnAuthorizedResult as UnAuthorizedResult,
} from './errors';
import { HttpStatusCode } from './http-status-codes';
import { responseInterceptor } from '../interceptors/interceptor';

/**
 * Contains helper methods to generate a HTTP response.
 */
export class ResponseBuilder {
  public static badRequest(
    code: string,
    description: string,
    res: ApiResponse
  ): void {
    const errorResult: BadRequestResult = new BadRequestResult(
      code,
      description
    );
    ResponseBuilder._returnAs<BadRequestResult>(
      errorResult,
      HttpStatusCode.BadRequest,
      res
    );
  }

  public static configurationError(
    code: string,
    description: string,
    res: ApiResponse
  ): void {
    const errorResult: ConfigurationErrorResult = new ConfigurationErrorResult(
      code,
      description
    );
    ResponseBuilder._returnAs<ConfigurationErrorResult>(
      errorResult,
      HttpStatusCode.ConfigurationError,
      res
    );
  }

  public static forbidden(
    code: string,
    description: string,
    res: ApiResponse
  ): void {
    const errorResult: ForbiddenResult = new ForbiddenResult(code, description);
    ResponseBuilder._returnAs<ForbiddenResult>(
      errorResult,
      HttpStatusCode.Forbidden,
      res
    );
  }

  public static internalServerError(error: Error, res: ApiResponse): void {
    const errorResult: InternalServerErrorResult =
      new InternalServerErrorResult(
        ErrorCode.GeneralError,
        JSON.stringify(error)
      );
    ResponseBuilder._returnAs<InternalServerErrorResult>(
      errorResult,
      HttpStatusCode.InternalServerError,
      res
    );
  }
  ApiResponse;
  public static notFound(
    code: string,
    description: string,
    res: ApiResponse
  ): void {
    const errorResult: NotFoundResult = new NotFoundResult(code, description);
    ResponseBuilder._returnAs<NotFoundResult>(
      errorResult,
      HttpStatusCode.NotFound,
      res
    );
  }

  public static unAuthorized(
    code: string,
    description: string,
    res: ApiResponse
  ): void {
    const errorResult: UnAuthorizedResult = new UnAuthorizedResult(
      code,
      description
    );
    ResponseBuilder._returnAs<UnAuthorizedResult>(
      errorResult,
      HttpStatusCode.UnAuthorized,
      res
    );
  }
  public static ok<T>(result: T, res: ApiResponse): void {
    ResponseBuilder._returnAs<T>(result, HttpStatusCode.Ok, res);
  }

  private static _returnAs<T>(
    result: any,
    statusCode: number,
    res: ApiResponse
  ): ApiResponse {
    responseInterceptor(result);
    const bodyObject: ErrorResponseBody | T =
      result instanceof ErrorResult ? { error: result } : result;
    // const response: any = {
    //   body: JSON.stringify(bodyObject),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*'  // This is required to make CORS work with AWS API Gateway Proxy Integration.
    //   },
    //   statusCode
    // };
    return res.status(statusCode).json(bodyObject);
  }
}
