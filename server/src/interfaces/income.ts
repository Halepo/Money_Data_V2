import { ObjectId } from "bson"

export interface IIncome {
    id?: ObjectId,
    userId?: ObjectId,
    accountId?: ObjectId,
    categoryId: ObjectId,
    amount: number,
    reason?: string,
    description?: string,
    created?: string
}