import { Router } from 'express';
import { createUsersController, getAllUsersController, usersLoginController } from '../../controllers/users';
import { checkUserEmail, verifyToken } from '../../middlewares/users';
import { validateBody } from '../../middlewares/validateBody';
import { loginSchema, userSchema } from '../../schemas/users';

export const userRoutes: Router = Router();
export const loginRoute: Router = Router();

userRoutes.post('', validateBody(userSchema), checkUserEmail, createUsersController);
userRoutes.get('', verifyToken, getAllUsersController);

loginRoute.post('', validateBody(loginSchema), usersLoginController);