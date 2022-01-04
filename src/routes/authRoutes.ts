import { Router, Request, Response, NextFunction } from "express";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import { basicAuthMiddleware } from "../middlewares/basicAuthMiddleware";
import { ForbiddenError } from "../models/errors/forbiddenErrorModel";

export const authRouter = Router();

// “iss” O domínio da aplicação geradora do token
// “sub” É o assunto do token, mas é muito utilizado para guarda o ID do usuário
// “aud” Define quem pode usar o token
// “exp” Data para expiração do token
// “nbf” Define uma data para qual o token não pode ser aceito antes dela
// “iat” Data de criação do token
// “jti” O id do token

authRouter.post('/api/v1/token', basicAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            throw new ForbiddenError('Usuário não informado');
        }

        const jwtPayload = { username: user.username };
        const jwtOptions = { subject: user.uuid };
        const secretKey = 'secret_key';

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

        res.status(StatusCodes.OK).json({ token: jwt });

    } catch (error) {
        next(error);
    }
})

authRouter.post('/api/v1/token/validate', basicAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
})