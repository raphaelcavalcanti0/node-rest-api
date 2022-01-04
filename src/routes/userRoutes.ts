import { Router, Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../repositories/userRepository';

export const usersRoutes = Router();

usersRoutes.get('/api/v1/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).send({ users });
});

usersRoutes.get('/api/v1/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    try {
        const user = await userRepository.findById(uuid);
        res.status(StatusCodes.OK).send({ user });
    } catch (error) {
        next(error);
    }
});

usersRoutes.post('/api/v1/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    const uuid = await userRepository.create(newUser);
    res.status(StatusCodes.CREATED).send(uuid);
});

usersRoutes.put('/api/v1/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const updateUser = req.body;
    updateUser.uuid = uuid;

    await userRepository.update(updateUser);

    res.status(StatusCodes.OK).send({ retorno: `Usuários id: ${uuid} alterado.` });
});

usersRoutes.delete('/api/v1/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await userRepository.delete(uuid);
    res.status(StatusCodes.OK).send({ deleted: uuid });
});
