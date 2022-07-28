import { ObjectId } from 'bson';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class Student {

    @IsNotEmpty()
    @Column()
    public _id: ObjectId;

    @Column()
    public participant_id: ObjectId;

    @Column()
    public program_id: ObjectId;

    @Column()
    public stakeholders: [];

    @Column()
    public adks: [];

    @Column()
    public created: string;

    @Column()
    public lastSaved: string;

    @Column()
    public studentResidence: string;

    @Column()
    public studentSchool: string;

    @Column()
    public studentEthnicity: [];

    @Column()
    public progress: number;

    @Column()
    public role: string;

    public toString(): string {
        return `${this.role}`;
    }

}
