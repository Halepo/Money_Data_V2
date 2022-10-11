import { db } from '../config/database/mongo'
import { ObjectId } from 'bson';
import { logger } from '../classes/consoleLoggerClass';
import { ICategory } from '../interfaces/category';

export class CategoryRepository {

    public async registerCategory(newCategory: ICategory): Promise<any> {
        logger.infoData("Registering expense..");
        let result = await db.collection('Category').insertOne(
            newCategory
            , { upsert: true, returnOriginal: false });

        logger.infoData(result, 'Registered Expense')
        if (result.ops[0]) return result.ops[0]
    };

    public async fetchAllCategory(): Promise<any> {
        logger.infoData("Fetching Category...");
        let result = await db.collection('Category').find(
        ).toArray();

        logger.infoData(result, 'All Category')
        if (result) return result
    };

    public async deleteCategory(id: string): Promise<any> {
        logger.infoData("Deleting Category...");
        let result = await db.collection('Category').deleteOne(
            { '_id': new ObjectId(id) }
        )
        logger.infoData('Successfully Deleted!')
        if (result.deletedCount === 1) {
            logger.infoData('Successfully Deleted!');
            return {
                message: 'Successfully Deleted!'
            }
        }
    }

    public async editCategory(id: string, updatedCategory: ICategory): Promise<any> {
        logger.infoData("Editing Category...");
        let result = await db.collection('Category').updateOne(
            { '_id': new ObjectId(id) },
            { $set: { category: updatedCategory.category, description: updatedCategory.description } },
            {
                returnOriginal: false,
                upsert: true,
            }
        )
        logger.infoData('Successfully Updated!')
        logger.infoData(result, 'Updated Category')
        if (result) return updatedCategory
    }
}