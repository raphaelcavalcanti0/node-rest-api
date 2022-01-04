import { authRouter } from './routes/authRoutes';
import { usersRoutes } from './routes/userRoutes';
import express from 'express';
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import { bearerJwtAuthMiddleware } from './middlewares/bearerJwtAuthMiddleware';

const app = express();
const port = 8000;

// Setting Middleware to JSON formatted files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting routes
app.use(authRouter);
app.use(bearerJwtAuthMiddleware, usersRoutes);

// Setting error handler middleware
app.use(errorHandler);

// Starting server
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/api/v1/users`);
});