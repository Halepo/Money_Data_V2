import { IUser } from '../interfaces';
import { db } from '@rootlib/mongo';
import { logger } from '../classes/consoleLoggerClass';
import { ObjectId } from 'bson';

export class UserRepository implements IUser<[]> {

    public async findById(id: string): Promise<[]> {
        logger.infoData("find user by id...");
        let result = await db.collection('User').findOne({
            _id: new ObjectId(id)
        });
        return result;
    }

    public async findByIds(ids: []): Promise<[]> {
        logger.infoData("find user by id...");

        let Ids = ids.map(id => new ObjectId(id))

        // const Ids = [new ObjectId("55880c251df42d0466919268"), new ObjectId("55bf528e69b70ae79be35006")]
        const result = await db.collection('User').find({ "_id": { "$in": Ids } }).toArray()

        await result.forEach(console.dir);
        return result;
    }
}