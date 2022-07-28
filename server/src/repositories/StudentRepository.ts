import { db } from '@rootlib/mongo';
import { Student } from '../models/Student';
import { IStudent } from '../interfaces';
import { logger } from '../classes/consoleLoggerClass';
import { ObjectId } from 'bson';

export class StudentRepository implements IStudent<Student>  {

    public async findCountWithFilter(): Promise<Student[]> {
        logger.infoData("find Student total count with filter...")
        let result = await db.collection("Student").find({ "adks.name": "directory" }).count();
        return result;
    }

    public async findBySkipAndLimitForDirectoryAdk(skip: number): Promise<Student[]> {
        logger.infoData("find Student with directory adk by skip and limit...");
        let result = await db.collection("Student").find({
            "adks.name": "directory"
        }).skip(skip).limit(50).toArray();
        return result;
    }

    public async updateDirectoryAdkName(id: string): Promise<Student[]> {
        logger.infoData("update student adk name...")
        let result = await db.collection('Student').findOneAndUpdate({
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
