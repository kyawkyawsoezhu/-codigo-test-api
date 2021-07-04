import { NextFunction, Request, Response } from "express";

export class PaymentController {
    async all(request: Request, response: Response, next: NextFunction) {
        return ['creditCard', 'cash'];
    }
}
