import { ApiCallback, ApiContext } from '../shared/api.interfaces';
import { ResponseBuilder } from '../shared/response-builder';
import { requestInterceptor } from '../interceptors/interceptor';
import { DirectoryService } from '../services';
import { logger } from '../classes/consoleLoggerClass';
import { ErrorCode } from '../shared/error-codes';
import { ObjectId } from 'bson';
import createEventSchema from '@functions/CreateDirectory/schema';
import { IDirectoryPreference } from 'src/interfaces';

export class CreateDirectoryController {
    public constructor(private readonly _service: DirectoryService) { }
    public createDirectory: any = async (
        event: any,
        context: ApiContext,
        callback: ApiCallback
    ): Promise<void> => {
        context.callbackWaitsForEmptyEventLoop = false;
        requestInterceptor(event.body);
        try {
            if (event.body || event.queryStringParameters) {
                logger.infoData(event.userInfo, 'userData');
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
                    };
                    const result = createEventSchema.validate(validationBody);
                    logger.logData('validation result', result);
                    if (!result.error) {
                        logger.infoData(result.value);
                        if (Object.keys(result.value).length === 0) {
                            return ResponseBuilder.badRequest(
                                ErrorCode.Invalid,
                                'request body is required and must be not empty',
                                callback
                            );
                        }

                        let userId = result.value.userId;
                        let programId = result.value.programId;
                        let studentId = result.value.studentId;

                        // checking if directory preference exists
                        // let ProgramWithDirectoryExists =
                        //     await this._service.findProgramWithDirectory(programId, studentId);
                        // if (!ProgramWithDirectoryExists) {
                        //     this._service.createAdkWithDirectory(programId, studentId);
                        // }

                        let programDirectoryPreferencesOfUser =
                            await this._service.getProgramDirectoryPreferencesByUser(
                                userId,
                                programId,
                                studentId
                            );

                        logger.infoData(
                            programDirectoryPreferencesOfUser,
                            'programDirectoryPreferencesOfUser'
                        );

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

                        logger.infoData(
                            newDirectoryPreferenceArray,
                            'newDirectoryPreferenceArray'
                        );
                        if (!programDirectoryPreferencesOfUser) {
                            let ProgramDirectoryPreferences =
                                await this._service.getProgramDirectoryPreferences(programId, studentId, isGettingBadges);

                            ProgramDirectoryPreferences = ProgramDirectoryPreferences ? ProgramDirectoryPreferences : []

                            let Directory =
                                await this._service.createProgramDirectoryPreferences(
                                    programId,
                                    studentId,
                                    [
                                        ...ProgramDirectoryPreferences,
                                        newDirectoryPreferenceArray
                                    ]
                                );

                            logger.infoData(
                                Directory,
                                'Directory Preference created successfully'
                            );
                            return ResponseBuilder.ok(
                                {
                                    message: " Directory Preference Created Successfully", data:
                                        newDirectoryPreferenceArray
                                }
                                ,
                                callback
                            );
                        } else {
                            return ResponseBuilder.forbidden(
                                ErrorCode.GeneralError,
                                'Directory Preferences for this user already exist',
                                callback
                            );
                        }
                    } else {
                        logger.infoData('error happened');
                        return ResponseBuilder.badRequest(
                            ErrorCode.Invalid,
                            result.error.details[0].message,
                            callback
                        );
                    }
                } else {
                    return ResponseBuilder.badRequest(
                        ErrorCode.Invalid,
                        'User not found or invalid token',
                        callback
                    );
                }
            } else {
                logger.errorData('body parameters not found');
                return ResponseBuilder.badRequest(
                    ErrorCode.Invalid,
                    'body parameters not found',
                    callback
                );
            }
        } catch (error) {
            logger.errorData(error);
            return ResponseBuilder.internalServerError(error, callback);
        }
    };
}
