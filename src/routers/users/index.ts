import { Router } from 'express';
import { createUsersController, usersLoginController } from '../../controllers/users';
import { checkUserEmail } from '../../middlewares/users';
import { validateBody } from '../../middlewares/validateBody';
import { loginSchema, userSchema } from '../../schemas/users';

export const userRoutes: Router = Router();
export const loginRoute: Router = Router();

userRoutes.post('', validateBody(userSchema), checkUserEmail, createUsersController);

loginRoute.post('', validateBody(loginSchema), usersLoginController);