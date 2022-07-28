import { ApiCallback, ApiContext } from '../shared/api.interfaces';
import { ResponseBuilder } from '../shared/response-builder';
import { requestInterceptor } from '../interceptors/interceptor';
import { DirectoryService } from '../services';
import { logger } from '../classes/consoleLoggerClass';
import { ErrorCode } from '../shared/error-codes';
import createEventSchema from '@functions/GetDirectoryBadgeUsers/schema';

export class GetDirectoryBadgeUsers {
    public constructor(private readonly _service: DirectoryService) { };
    public getDirectoryBadgeUsers: any = async (event: any, context: ApiContext, callback: ApiCallback): Promise<void> => {
        context.callbackWaitsForEmptyEventLoop = false;
        requestInterceptor(event.body);
        try {
            if (event.body || event.queryStringParameters) {
                logger.infoData(event.userInfo, "userData");
                let user = event.userInfo;
                let isGettingBadges = true
                if (user) {
                    let validationBody = {
                        programId: event.queryStringParameters.program_id,
                        studentId: event.queryStringParameters.student_id,
                        employerOnly: event.queryStringParameters.employer_only,
                        dateFilter: event.queryStringParameters.date_filter,
                    }
                    const result = createEventSchema.validate(validationBody);
                    logger.logData("validation result", result);
                    if (!result.error) {
                        logger.infoData(result.value);
                        if (Object.keys(result.value).length === 0) {
                            return ResponseBuilder.badRequest(ErrorCode.Invalid, "request body is required and must be not empty", callback);
                        }
                        let arrayOfIds = []
                        let studentInformation = []
                        let employerInformation = []
                        let response = [];
                        let programId = result.value.programId;
                        let studentId = result.value.studentId;
                        let employerOnly = result.value.employerOnly;
                        let dateFilter = result.value.dateFilter;
                        let now = new Date
                        //filter students by student.offerDetails.internshipStart    here...
                        let Students = await this._service.getStudentsByProgramId(programId);
                        let Employers = await this._service.getEmployersByProgramId(programId);
                        let ProgramDirectoryPreferences = await this._service.getProgramDirectoryPreferences(programId, studentId, isGettingBadges);


                        logger.infoData(ProgramDirectoryPreferences, 'All ProgramDirectoryPreferences')
                        if (Students.length > 0) {
                            //filter students
                            Students = Students.filter((student) => {
                                //filter here
                                if (dateFilter === "current_interns" || !dateFilter) {
                                    logger.infoData("filtering current interns...");
                                    return new Date(student.offerDetails.internshipStart) < now && new Date(student.offerDetails.internshipEnd) > now
                                } else if (dateFilter === "past_interns") {
                                    logger.infoData("filtering past interns...");
                                    return new Date(student.offerDetails.internshipEnd) < now
                                } else if (dateFilter === "future_interns") {
                                    logger.infoData("filtering future interns...");
                                    return new Date(student.offerDetails.internshipStart) > now
                                }
                            })
                            arrayOfIds.push({ students: Students.map(student => student.participant_id), role: "student" });
                            studentInformation = await this._service.getUserByIds(arrayOfIds[0].students)
                        } else { arrayOfIds.push({ students: [], role: "student" }); }
                        if (Employers.length > 0) {
                            arrayOfIds.push({ employers: Employers, role: "employer" });
                            // logger.infoData(arrayOfIds[1].employers, "arrayOfIds CHECKING EMPLOYER")
                            employerInformation = await this._service.getUserByIds(arrayOfIds[1].employers)
                        } else { arrayOfIds.push({ employers: [], role: "student" }); }
                        if (studentInformation.length > 0 && !employerOnly || employerOnly === false) {
                            response.push(...studentInformation.map(student => {
                                return {
                                    user_id: student._id + "",
                                    first_name: student.firstName,
                                    last_name: student.lastName,
                                    email: student.email,
                                    phone_number: student.phoneNumber,

                                    role: 'student',
                                    directoryPreference: ProgramDirectoryPreferences
                                        ?
                                        studentId ? ProgramDirectoryPreferences : ProgramDirectoryPreferences.filter(preference => preference.userId + "" === student._id + "")[0]
                                        :
                                        null
                                }
                            }))
                        }
                        if (employerInformation.length > 0) {
                            response.push(...employerInformation.map(employer => {
                                return {
                                    user_id: employer._id + "",
                                    first_name: employer.firstName,
                                    last_name: employer.lastName,
                                    email: employer.email,
                                    phone_number: employer.phoneNumber,
                                    role: 'employer',
                                    directoryPreference: ProgramDirectoryPreferences
                                        ?
                                        ProgramDirectoryPreferences.filter(preference => preference.userId + "" === employer._id + "")[0]
                                        : null
                                }
                            }));
                        };
                        const filteredUndefined = await response.filter(element => { return element.first_name === undefined });
                        let filteredDefined = await response.filter(element => { return element.first_name != null });
                        filteredDefined = filteredDefined.sort(function (a, b) {
                            if (a.first_name && b.first_name) {
                                if (a.first_name < b.first_name) { return -1; }
                                if (a.first_name > b.first_name) { return 1; }
                            }
                            return 0;
                        });
                        response = [...filteredDefined, ...filteredUndefined];
                        logger.infoData(response, `${employerOnly === !true ? "students and" : ""} employers data...`);
                        logger.infoData('This is the final log before res')
                        return ResponseBuilder.ok(response, callback);
                    } else {
                        logger.errorData("body parameters not found");
                        return ResponseBuilder.badRequest(ErrorCode.Invalid, "Query string parameters parameters not found", callback);
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