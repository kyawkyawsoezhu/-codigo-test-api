import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./Order";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    phoneNumber: string;

    @Column()
    password: string;

    @OneToMany(() => Order, order => order.user)
    orders: Order[]

}
