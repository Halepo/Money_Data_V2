import { ObjectId } from 'bson';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class CronDetails {

    @IsNotEmpty()
    @Column()
    public _id: ObjectId;

    @IsNotEmpty()
    @Column()
    public skip: number;

    @IsNotEmpty()
    @Column()
    public counter: number;

    @IsNotEmpty()
    @Column()
    public totalCount: number;

    public toString(): string {
        return `${this._id}`;
    }

}
