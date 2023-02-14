import { Router } from 'express';
import { createUsersController } from '../../controllers/users';
import { checkUserEmail } from '../../middlewares/users';

export const userRoutes: Router = Router();

userRoutes.post('', checkUserEmail, createUsersController);