import { Router, Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const usersRoutes = Router();
const users = {};

usersRoutes.get('/api/v1/users', (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).send({ users });
});

usersRoutes.get('/api/v1/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    res.status(StatusCodes.OK).send({ uuid });
});

usersRoutes.post('/api/v1/users', (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    console.log(newUser);
    res.status(StatusCodes.CREATED).send(newUser);
});

usersRoutes.put('/api/v1/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const updateUser = req.body;
    console.log(`Usuários id: ${uuid} alterado.`);
    res.status(StatusCodes.OK).send({ retorno: `Usuários id: ${uuid} alterado.`, user: updateUser });
});

usersRoutes.delete('/api/v1/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    res.status(StatusCodes.OK).send({ deleted: uuid });
});
