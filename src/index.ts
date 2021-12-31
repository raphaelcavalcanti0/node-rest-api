import express, { Request, Response, NextFunction } from 'express';
import { usersRoutes } from './routes/user_routes';

const app = express();
const port = 8000;

// Setting Middleware to JSON formatted files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting routes
app.use(usersRoutes);

// Starting server
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/api/v1/users`);
});