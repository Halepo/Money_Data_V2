import { ApiCallback, ApiContext } from '../shared/api.interfaces';
import { ResponseBuilder } from '../shared/response-builder';
import { requestInterceptor } from '../interceptors/interceptor';
import { DirectoryService } from '../services';
import { logger } from '../classes/consoleLoggerClass';
import { ErrorCode } from '../shared/error-codes';
import { ObjectId } from 'bson';
import updateEventSchema from '@functions/UpdateDirectory/schema';
import { IDirectoryPreference } from 'src/interfaces';

export class UpdateDirectoryController {
    public constructor(private readonly _service: DirectoryService) {
    };
    public updateDirectory: any = async (event: any, context: ApiContext, callback: ApiCallback): Promise<void> => {
        context.callbackWaitsForEmptyEventLoop = false;
        requestInterceptor(event.body);
        try {
            if (event.body || event.queryStringParameters) {
                logger.infoData(event.userInfo, "userData");
                let user = event.userInfo;
                let isGettingBadges = false
                if (user) {
                    let validationBody = {
                        userId: event.body.user_id,
                        programId: event.body.program_id,
                        studentId: event.body.student_id,
                        contactMethod: event.body.contact_method,
                        contactPreferences: event.body.contact_preferences,
                        hideEmail: event.body.hide_email,
                        hidePhone: event.body.hide_phone,
                        schedulingLink: event.body.scheduling_link,
                    }
                    const result = updateEventSchema.validate(validationBody);
                    logger.logData("validation result", result);
                    if (!result.error) {

                        logger.infoData(result.value);
                        if (Object.keys(result.value).length === 0) {
                            return ResponseBuilder.badRequest(ErrorCode.Invalid, "request body is required and must be not empty", callback);
                        }
                        let userId = result.value.userId
                        let programId = result.value.programId
                        let studentId = result.value.studentId;

                        let ProgramWithDirectoryExists = await this._service.findProgramWithDirectory(programId, studentId)

                        if (ProgramWithDirectoryExists === null) {
                            return ResponseBuilder.notFound(ErrorCode.GeneralError, 'No directory Preferences for this user found', callback)
                        }
                        let newDirectoryPreferenceArray: IDirectoryPreference = {
                            contactMethod: result.value.contactMethod,
                            contactPreferences: result.value.contactPreferences,
                            hideEmail: result.value.hideEmail,
                            hidePhone: result.value.hidePhone,
                            schedulingLink: result.value.schedulingLink,
                        };

                        if (!studentId) {
                            newDirectoryPreferenceArray = { ...newDirectoryPreferenceArray, userId: new ObjectId(userId) }
                        }

                        let programDirectoryPreferences = await this._service.getProgramDirectoryPreferences(programId, studentId, isGettingBadges)

                        if (!programDirectoryPreferences) {
                            programDirectoryPreferences = []
                        }

                        if (studentId ?
                            programDirectoryPreferences :
                            programDirectoryPreferences.filter(preference => preference.userId + "" === userId).length > 0
                        ) {
                            let filteredProgramDirectoryPreferences;
                            if (!studentId) {
                                filteredProgramDirectoryPreferences = programDirectoryPreferences.filter(preference => preference.userId + "" != userId + "")
                            } else filteredProgramDirectoryPreferences = []

                            let Directory = await this._service.updateProgramDirectoryPreferences(programId, studentId, [...filteredProgramDirectoryPreferences, newDirectoryPreferenceArray]);

                            if (Directory) {
                                logger.infoData(newDirectoryPreferenceArray, "Directory Preference updated successfully");
                                return ResponseBuilder.ok(newDirectoryPreferenceArray, callback);
                            } else {
                                return ResponseBuilder.forbidden(ErrorCode.GeneralError, "Failed to update Directory", callback);
                            }
                        } else {
                            return ResponseBuilder.forbidden(ErrorCode.GeneralError, "Directory Preferences for this user doesn't exist", callback);
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
                return ResponseBuilder.badRequest(ErrorCode.Invalid, "body parameters not found", callback);
            }
        } catch (error) {
            logger.errorData(error);
            return ResponseBuilder.internalServerError(error, callback);
        }
    }
}