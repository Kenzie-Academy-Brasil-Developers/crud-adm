import express, { Application } from 'express';
import { userRoutes } from './routers/users';

export const app: Application = express();
app.use(express.json());

app.use('/users', userRoutes);