import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Item } from "../entity/Item";

export class PromoCodeVerifyController {
    private itemRepository = getRepository(Item);

    async __invoke(request: Request, response: Response, next: NextFunction) {

        if (!request.body.code) {
            response.status(422).json({ errors: { "code": "required" } });
            return;
        }

        const item = await this.itemRepository.findOne({ relations: ['voucher'], where: { code: request.body.code } });
        if (!item) {
            response.status(422).json({ errors: { "code": "invilade" } });
            return;
        }

        return {
            code: item.code,
            qrImage: item.qrImage,
            isSold: item.isSold,
            expiredAt: item.voucher.expiredAt,
        };
    }
}
