import { Router } from 'express';
import { createUsersController, loginController } from '../../controllers/users';
import { checkUserEmail } from '../../middlewares/users';
import { validateBody } from '../../middlewares/validateBody';
import { userSchema } from '../../schemas/users';

export const userRoutes: Router = Router();
export const loginRoute: Router = Router();

userRoutes.post('', validateBody(userSchema), checkUserEmail, createUsersController);

loginRoute.post('', loginController);