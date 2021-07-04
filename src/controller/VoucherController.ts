import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Voucher } from "../entity/Voucher";

export class VoucherController {
    private voucherRepository = getRepository(Voucher);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.voucherRepository.find({ order: { id: 'DESC' } });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.voucherRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.voucherRepository.save(this.voucherRepository.create(request.body));
    }
}
