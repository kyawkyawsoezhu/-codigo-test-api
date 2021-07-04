import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item";
import { User } from "./User";

@Entity('orders')
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: ["creditCard", "cash"],
    })
    paymentMethod: "creditCard" | "cash"

    @Column()
    price: number

    @CreateDateColumn()
    createdAt: Date

    @OneToOne(() => Item)
    @JoinColumn()
    item: Item;

    @ManyToOne(() => User, user => user.orders)
    user: User
}
