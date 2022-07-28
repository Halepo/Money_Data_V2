import { ApiCallback, ApiContext } from '../shared/api.interfaces';
import { ResponseBuilder } from '../shared/response-builder';
import { requestInterceptor } from '../interceptors/interceptor';
import { DirectoryService } from '../services';
import { logger } from '../classes/consoleLoggerClass';
import { ErrorCode } from '../shared/error-codes';
import createEventSchema from '@functions/GetDirectory/schema';

export class GetDirectoryController {
    public constructor(private readonly _service: DirectoryService) {
    };
    public getDirectory: any = async (event: any, context: ApiContext, callback: ApiCallback): Promise<void> => {
        context.callbackWaitsForEmptyEventLoop = false;
        requestInterceptor(event.body);
        try {
            if (event.queryStringParameters) {
                logger.infoData(event.userInfo, "userData");
                let user = event.userInfo;
                if (user) {
                    let validationBody = {
                        userId: event.queryStringParameters.user_id,
                        programId: event.queryStringParameters.program_id,
                        studentId: event.queryStringParameters.student_id,
                    }
                    const result = createEventSchema.validate(validationBody);
                    logger.logData("validation result", result);
                    if (!result.error) {
                        logger.infoData(result.value);
                        if (Object.keys(result.value).length === 0) {
                            return ResponseBuilder.badRequest(ErrorCode.Invalid, "request body is required and must be not empty", callback);
                        }
                        let userId = result.value.userId
                        let programId = result.value.programId
                        let studentId = result.value.studentId

                        let programDirectoryPreferencesOfUser = await this._service.getProgramDirectoryPreferencesByUser(userId, programId, studentId);

                        logger.infoData(programDirectoryPreferencesOfUser, "programDirectoryPreferencesOfUser");

                        if (programDirectoryPreferencesOfUser != undefined) {
                            return ResponseBuilder.ok(programDirectoryPreferencesOfUser, callback);
                        } else {
                            return ResponseBuilder.ok({}, callback);
                        }
                    } else {
                        console.log('error happened')
                        return ResponseBuilder.badRequest(ErrorCode.Invalid, result.error.details[0].message, callback);
                    }
                } else {
                    return ResponseBuilder.badRequest(ErrorCode.Invalid, "User not found or invalid token", callback);
                }
            } else {
                logger.errorData("body parameters not found");
                return ResponseBuilder.badRequest(ErrorCode.Invalid, "Query parameter program_id not found", callback);
            }
        } catch (error) {
            logger.errorData(error);
            return ResponseBuilder.internalServerError(error, callback);
        }
    }
}