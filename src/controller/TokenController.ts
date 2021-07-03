import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as jwt from 'jsonwebtoken';

export class TokenController {

    private userRepository = getRepository(User);
    
    // generate token
    async save(request: Request, response: Response, next: NextFunction) {
        const credentials = {
            username: request.body.username,
            password: request.body.password
        }

        const user = await this.userRepository.findOne(credentials);
        if (!user) {
            response.sendStatus(404);
        }

        const accessToken = jwt.sign({ username: credentials.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });
        const refreshToken = jwt.sign({ username: credentials.username }, process.env.REFRESH_TOKEN_SECRET);

        response.json({ accessToken, refreshToken })
    }

    // refresh token
    async update(request: Request, response: Response, next: NextFunction) {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) {
            request.json({ message: 'Invalid refresh token' });
        }

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) {
                response.json({ message: 'Some error occured' });
            }
            else {
                const accessToken = jwt.sign({ username: payload.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });
                response.json({ accessToken: accessToken });
            }
        });

    }
}

