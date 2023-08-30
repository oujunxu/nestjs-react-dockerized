import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserI, UserRole } from "./user.interface";

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    roles: UserRole

    @BeforeInsert()
    emailToLowerCase(){
        this.email = this.email.toLocaleLowerCase();
    }
}