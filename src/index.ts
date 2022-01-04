import { authRouter } from './routes/authRoutes';
import { usersRoutes } from './routes/userRoutes';
import express, { Request, Response, NextFunction } from 'express';
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import { bearerAuthMiddleware } from './middlewares/bearerAuthMiddleware';

const app = express();
const port = 8000;

// Setting Middleware to JSON formatted files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting routes
app.use(bearerAuthMiddleware, usersRoutes);
app.use(authRouter);

// Setting error handler middleware
app.use(errorHandler);

// Starting server
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/api/v1/users`);
});