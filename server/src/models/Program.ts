import { ObjectId } from 'bson';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class Program {

    @IsNotEmpty()
    @Column()
    public _id: ObjectId;

    @Column()
    public colors: string;

    @IsNotEmpty()
    @Column()
    public age: number;

    @Column()
    public adks: [];

    @Column()
    public selectedDistrict: string;

    @Column()
    public programName: string;

    @Column()
    public videoAskShareId: string;

    @Column()
    public programDesc: string;

    @Column()
    public ageRange: [];

    @Column()
    public requiredResidency: [];

    @Column()
    public requiredSkills: [];

    @Column()
    public requiredTech: [];

    @Column()
    public rewards: [];

    @Column()
    public pathways: [];

    @Column()
    public organizers: [];

    @Column()
    public dateCreated: string;

    @Column()
    public licensed: string;

    @Column()
    public rewardPresets: [];

    @Column()
    public lastSaved: string;

    @Column()
    public published: boolean;

    @Column()
    public participants: [];

    @Column()
    public joinAt: [];

    @Column()
    public start_activity_status: string;

    public toString(): string {
        return `${this.programName}`;
    }

}
