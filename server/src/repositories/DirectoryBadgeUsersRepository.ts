import { db } from '@rootlib/mongo';
import { ObjectId } from 'bson';
import { logger } from '../classes/consoleLoggerClass';

//check the interface implementation.... //implements IProgram<Program>
export class DirectoryBadgeUsersRepository {
    public async getStudentsByProgramId(programId: string): Promise<any> {
        let query = {
            $and: [
                { program_id: new ObjectId(programId) },
                {
                    offerDetails: { $exists: true, $nin: [null, undefined] }
                },
                {/*  .offerDetails.internshipStart */ },
                { 'adks.name': 'offer' },
                { 'adks.offerStatus': true }]
        }
        logger.infoData("Finding program students...");
        let result = await db.collection('Student').find(query).toArray();
        logger.infoData("program students...", result);
        return result
    }

    public async getEmployersByProgramId(programId: string): Promise<any> {
        let query = { _id: new ObjectId(programId) };
        logger.infoData("Finding  program employers...");
        let result = await db.collection('Program').find(query).toArray();
        if (result[0] != undefined) {
            logger.infoData("program employers...", result[0].organizers);
            return result[0].organizers
        } else return []
    }

}