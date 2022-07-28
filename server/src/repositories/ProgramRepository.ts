import { db } from '@rootlib/mongo';
import { Program } from '../models/Program';
import { ObjectId } from 'bson';
import { IProgram } from '../interfaces';
import { logger } from '../classes/consoleLoggerClass';

export class ProgramRepository implements IProgram<Program> {

    public async findCountWithFilter(): Promise<Program[]> {
        logger.infoData("find Program total count with filter...")
        let result = await db.collection("Program").find({ "adks.name": "directory" }).count();
        return result;
    }

    public async findBySkipAndLimitForDirectoryAdk(skip: number): Promise<Program[]> {
        logger.infoData("find Program with directory adk by skip and limit...");
        let result = await db.collection("Program").find({
            "adks.name": "directory"
        }).skip(skip).limit(50).toArray();
        return result;
    }

    public async updateDirectoryAdkName(id: string): Promise<Program[]> {
        logger.infoData("update Program adk name...")
        let result = await db.collection('Program').findOneAndUpdate({
            _id: new ObjectId(id),
            'adks.name': "directory"
        }, {
            $set: {
                "adks.$.name": "contact"
            }
        });
        return result;
    }
}
