import { ObjectId } from "bson";

export interface IAccount {
    userId: ObjectId,
    accountBalance: number,
    accountName: string,
    bank?: string,
    accountNumber?: number,
    accountDescription?: srting,
    created: string
}