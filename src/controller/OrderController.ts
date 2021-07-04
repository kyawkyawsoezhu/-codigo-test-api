import { getRepository, Not } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Voucher } from "../entity/Voucher";
import { Order } from "../entity/Order";
import { Item } from "../entity/Item";

export class OrderController {
    private voucherRepository = getRepository(Voucher);
    private orderRepository = getRepository(Order);
    private itemRepository = getRepository(Item);

    async save(request: Request, response: Response, next: NextFunction) {

        const voucher = await this.voucherRepository.findOne({ where: { id: request.body.voucherId, isActive: true, quantity: Not(0) } });

        if (!voucher) {
            response.status(422).json({ errors: { 'voucherId': "voucher doesn't exists" } });
            return;
        }

        let price = voucher.amount;
        if (voucher.discountPayment == request.body.paymentMethod) {
            price = voucher.amount - (voucher.amount * voucher.discountValue / 100) // discount with percentage
        }

        const item = await this.itemRepository.findOne({ where: { voucher: { id: voucher.id }, isSold: false } });

        const order = this.orderRepository.save(this.orderRepository.create({
            paymentMethod: request.body.paymentMethod,
            price,
            item: item,
            user: request.user.id,
        }));

        await this.itemRepository.update(item.id, { isSold: true });
        await this.voucherRepository.update(voucher.id, { quantity: voucher.quantity - 1 });

        return { message: "Order Success" };

    }
}
