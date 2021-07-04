import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export class TokenController {

    private userRepository = getRepository(User);

    // generate token
    async save(request: Request, response: Response, next: NextFunction) {

        const user = await this.userRepository.findOne({ username: request.body.username });
        if (!user) {
            response.sendStatus(401);
            return;
        }

        const passwordMatch = await bcrypt.compare(request.body.password, user.password);
        if (!passwordMatch) {
            response.sendStatus(401);
            return;
        }

        const accessToken = jwt.sign({ username: request.body.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });
        const refreshToken = jwt.sign({ username: request.body.username }, process.env.REFRESH_TOKEN_SECRET);

        response.json({ accessToken, refreshToken })
    }

    // refresh token
    async update(request: Request, response: Response, next: NextFunction) {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) {
            response.statStatus(401)
            return;
        }

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) {
                response.statStatus(401);
                return;
            }
            else {
                const accessToken = jwt.sign({ username: payload.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });
                response.json({ accessToken: accessToken });
            }
        });

    }
}

