import { Column, PrimaryGeneratedColumn, Entity, Timestamp, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity, AfterInsert } from "typeorm";
import { Item } from "./Item";
import axios from "axios";

@Entity('vouchers')
export class Voucher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    expiredAt: Date;

    @Column({ nullable: true })
    image: string;

    @Column()
    amount: number;

    @Column()
    quantity: number;

    @Column({ default: true })
    isActive: boolean;

    @Column({
        type: "enum",
        enum: ["myself", "gift"],
    })
    type: "myself" | "gift"

    @Column()
    limitPerUser: number;

    @Column({
        type: "enum",
        enum: ["creditCard", "cash"],
    })
    discountPayment: "creditCard" | "cash";

    @Column()
    discountValue: number;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Item, item => item.voucher)
    items: Item[];

    @AfterInsert()
    callPromoCodeService() {
        console.log("call Promo Codes generator.....");
        axios.post(process.env.PROMOCODE_SERVICE_URL, { voucherId: this.id })
    }
}
