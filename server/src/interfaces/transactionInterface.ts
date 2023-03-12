import { ObjectId } from 'bson';

export interface ITransaction {
  id?: ObjectId;
  userId?: ObjectId;
  accountId?: ObjectId;
  categoryId: ObjectId;
  type: string;
  amount: number;
  currency?: string;
  reason?: string;
  description?: string;
  created: Date;
  dateTime?: Date;
}
