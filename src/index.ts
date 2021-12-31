import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 8000;

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ status: "agora sim" });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/status`);
});