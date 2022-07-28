import { db } from '@rootlib/mongo';
import { ObjectId } from 'bson';
import { logger } from '../classes/consoleLoggerClass';

//check the interface implementation.... //implements IProgram<Program>
export class DirectoryRepository {

    public async createProgramDirectoryPreferences(programId: string, studentId: string, directoryPreferenceArray): Promise<any> {
        logger.infoData("Updating directory...");
        let result;
        if (studentId) {
            let student = result = await db.collection('Student').findOne({
                program_id: new ObjectId(programId),
                _id: new ObjectId(studentId),
            })
            logger.infoData(student.participant_id, 'student Found')
            directoryPreferenceArray[0].userId = student.participant_id
            result = await db.collection('Student').findOneAndUpdate({
                program_id: new ObjectId(programId),
                _id: new ObjectId(studentId),
                'adks.name': 'contact',
            }, {
                $set: {
                    'adks.$.directoryPreferences': directoryPreferenceArray[0],
                },
            }, { returnOriginal: false });
        } else {
            result = await db.collection('Program').findOneAndUpdate({
                _id: new ObjectId(programId),
                'adks.name': 'contact',
            }, {
                $set: {
                    'adks.$.directoryPreferences': directoryPreferenceArray,
                },
            }, { returnOriginal: false });
        } return result;

    };

    public async updateProgramDirectoryPreferences(programId: string, studentId, directoryPreferenceArray): Promise<any> {
        logger.infoData("updating directory...");
        let result;
        if (studentId) {
            let student = result = await db.collection('Student').findOne({
                program_id: new ObjectId(programId),
                _id: new ObjectId(studentId),
            })
            directoryPreferenceArray[0].userId = student.participant_id
            result = await db.collection('Student').findOneAndUpdate({
                program_id: new ObjectId(programId),
                _id: new ObjectId(studentId),
                'adks.name': 'contact',
            }, {
                $set: {
                    'adks.$.directoryPreferences': directoryPreferenceArray[0],
                },
            }, { upsert: true, returnOriginal: false });
        } else {
            result = await db.collection('Program').findOneAndUpdate({
                _id: new ObjectId(programId),
                'adks.name': 'contact',
            }, {
                $set: {
                    'adks.$.directoryPreferences': directoryPreferenceArray,
                },
            }, { upsert: true, returnOriginal: false });
        }

        return result;
    };

    public async createAdkWithDirectory(programId: string, studentId: string): Promise<any> {
        logger.infoData("updating directory...");
        const adks = { name: "directory", directoryPreferences: studentId ? {} : [] }

        let result;
        if (studentId) {
            result = await db.collection('Student').findOneAndUpdate({
                program_id: new ObjectId(programId),
                _id: new ObjectId(studentId),
            }, {
                $push: {
                    adks,
                },
            }, { upsert: true, returnOriginal: false });
        } else {
            result = await db.collection('Program').findOneAndUpdate({
                _id: new ObjectId(programId),
            }, {
                $push: {
                    adks,
                },
            }, { upsert: true, returnOriginal: false });
        }
        return result;
    }

    public async findProgramWithDirectory(programId: string, studentId: string): Promise<any> {
        logger.infoData("Finding program with directories...");
        let result;
        if (studentId) {
            result = await db.collection('Student').findOne({
                program_id: new ObjectId(programId),
                _id: new ObjectId(studentId),
                'adks.name': 'contact',
            });
        } else {
            result = await db.collection('Program').findOne({
                _id: new ObjectId(programId),
                'adks.name': 'contact',
            });
        }
        return result;
    }

    public async getProgramDirectoryPreferences(programId: string, studentId: string, isGettingBadges: boolean): Promise<any> {
        logger.infoData("Getting ProgramDirectoryPreferences...");
        let response;
        if (studentId) {
            let student = await db.collection('Student').findOne({
                program_id: new ObjectId(programId),
                _id: new ObjectId(studentId),
            });
            if ('adks' in student) {
                if ('adks' in student) {
                    student.adks.forEach((adk) => {
                        if (adk.directoryPreferences) {
                            response = adk.directoryPreferences
                        }
                    })
                    if (response) {
                        return response
                    }
                }
            }
        } else {
            let arrayOfPreferences = []
            let program = await db.collection('Program').findOne({
                _id: new ObjectId(programId)
            });
            if (isGettingBadges) {
                let responseStudent = await db.collection('Student').find({
                    program_id: new ObjectId(programId)
                }).toArray();

                if (responseStudent.length != 0) {
                    responseStudent.forEach(student => {
                        logger.infoData(`Going through ${student._id}`)
                        //if there are adks
                        if ('adks' in student) {
                            student.adks.forEach((adk) => {
                                if (adk.directoryPreferences) {
                                    arrayOfPreferences.push(adk.directoryPreferences)
                                }
                            })
                        }
                    })
                }
            }
            if ('adks' in program) {
                program.adks.forEach((adk) => {
                    if (adk.directoryPreferences) {
                        arrayOfPreferences.push(...adk.directoryPreferences)
                    }
                })
            }

            logger.infoData(arrayOfPreferences, `Array of preferences of programId [${programId}]`)
            return arrayOfPreferences
        }
    }

    public async getProgramDirectoryPreferencesByUser(programId: string, userId: string, studentId: string): Promise<any> {
        logger.infoData(`Getting ProgramDirectoryPreferences for ${studentId ? `studentId: ${studentId}` : `userId: ${userId}`}...`);
        let response;
        if (studentId) {
            let student = await db.collection('Student').findOne({
                program_id: new ObjectId(programId),
                _id: new ObjectId(studentId),
            });
            logger.infoData(student, 'student')
            if (student && student.adks) {
                student.adks.forEach((adk) => {
                    if (adk.directoryPreferences) {
                        logger.infoData(`Directory preference of studentId [${studentId}]: `, adk.directoryPreferences);
                        response = adk.directoryPreferences
                    }
                })
                if (response) {
                    return response
                }
            }
        } else {
            let program = await db.collection('Program').findOne({
                _id: new ObjectId(programId)
            });
            logger.infoData(program, 'program')
            if (program && program.adks) {
                program.adks.forEach((adk) => {
                    if (adk.directoryPreferences) {
                        let userPreference = adk.directoryPreferences.filter(preference => preference.userId + "" === userId);
                        response = userPreference[0]
                    }
                })
                if (response) {
                    return response
                }
            }
        }
    }
}

