import { Router, Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../models/errors/forbiddenErrorModel";
import userRepository from "../repositories/userRepository";

export const authRouter = Router();

authRouter.post('/api/v1/token', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas');
        }

        const [authorizationType, token] = authorizationHeader.split(' ');

        if (authorizationType !== 'Basic' || !token) {
            throw new ForbiddenError('Tipo de autenticação inválido');
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

        const [username, password] = tokenContent.split(':');

        if (!username || !password) {
            throw new ForbiddenError('Credenciais não preenchidas');
        }

        const user = await userRepository.findByUsernameAndPassword(username, password);

        console.log(user);

    } catch (error) {
        next(error);
    }

})