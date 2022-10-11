import { ObjectId } from "bson";

export interface IExpense {
    userId: ObjectId,
    accountId: ObjectId,
    categoryId: ObjectId,
    amount: number,
    reason?: string,
    description?: string,
    created: string
}