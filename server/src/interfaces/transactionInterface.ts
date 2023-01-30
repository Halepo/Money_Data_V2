import { ObjectId } from 'bson';

export interface ITransaction {
  id?: ObjectId;
  userId?: ObjectId;
  accountId?: ObjectId;
  categoryId: ObjectId;
  type: string;
  amount: number;
  reason?: string;
  description?: string;
  created: Date;
  dateTime?: Date;
}
