import { Router } from 'express';
import { createUsersController } from '../../controllers/users';

export const userRoutes: Router = Router();

userRoutes.post('', createUsersController);