import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../models/errors/forbiddenErrorModel";
import JWT from 'jsonwebtoken';

export const bearerAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas');
        }

        const [authorizationType, token] = authorizationHeader.split(' ');

        if (authorizationType !== 'Bearer' || !token) {
            throw new ForbiddenError('Tipo de autenticação inválido');
        }

        const tokenPayload = JWT.verify(token, 'secret_key');

        if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
            throw new ForbiddenError('Token inválido');
        }
        const uuid = tokenPayload.sub;
        const user = {
            uuid: tokenPayload.sub,
            username: tokenPayload.username
        };

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}