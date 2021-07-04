import { Column, PrimaryGeneratedColumn, Entity, Timestamp, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity, AfterInsert } from "typeorm";
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

    @Column("text")
    image: string;

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

    @Column({
        type: "enum",
        enum: ["creditCards", "cash"],
    })
    discountPayment: "creditCards" | "cash";

    @Column()
    discountValue: number;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Item, item => item.vocher)
    items: Item[];

    @AfterInsert()
    callPromoCodeService() {
        console.log("call Promo Codes.....");
        console.log(`generate ${this.quantity} promo codes for ${this.title}`);
    }
}
