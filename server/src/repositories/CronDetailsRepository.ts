import { ICronDetails } from '../interfaces';
import { db } from '@rootlib/mongo';
import { CronDetails } from '../models/CrodDetails';
import { logger } from '../classes/consoleLoggerClass';
import { ObjectId } from 'bson';

export class CronDetailsRepository implements ICronDetails<CronDetails> {

    public async findById(id: string): Promise<CronDetails[]> {
        logger.infoData("find CronDetails by id...");
        let result = await db.collection('CronDetails').findOne({
            _id: new ObjectId(id)
        });
        return result;
    }

    public async updateCronDetails(id: string, skip: number, counter: number): Promise<CronDetails[]> {
        logger.infoData("find CronDetails by id...");
        let result = await db.collection('CronDetails').findOneAndUpdate({
            _id: new ObjectId(id)
        }, {
            $set: {
                skip: skip,
                counter: counter
            }
        });
        return result;
    }
}
