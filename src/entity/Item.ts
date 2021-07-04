import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Voucher } from "./Voucher";

@Entity('items')
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    // "6Digit5Alphabets"
    @Column({
        unique: true
    })
    code: string;

    // "6Digit5Alphabets"
    @Column('text')
    qrImage: string;

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Voucher, voucher => voucher.items)
    voucher: Voucher;
}
