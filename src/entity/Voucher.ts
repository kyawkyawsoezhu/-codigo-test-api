import { Column, PrimaryGeneratedColumn, Entity, Timestamp, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Item } from "./Item";

@Entity('vouchers')
export class Voucher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    expiredAt: Date;

    @Column()
    image: Buffer;

    @Column()
    amount: number;

    @Column()
    quantity: number;

    @Column()
    isActive: boolean;

    @Column({
        type: "enum",
        enum: ["myself", "gift"],
    })
    type: "myself" | "gift"

    @Column()
    limitPerUser: number;

    @Column()
    discountPayment: string;

    @Column()
    discountValue: number;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Item, item => item.vocher)
    items: Item[];
}
