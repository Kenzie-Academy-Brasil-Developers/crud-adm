import express, { Application } from 'express';
import 'express-async-errors';
import { handleErrors } from './middlewares/errorHandler';
import { loginRoute, userRoutes } from './routers/users';

export const app: Application = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/login', loginRoute);

app.use(handleErrors);