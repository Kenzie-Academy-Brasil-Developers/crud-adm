import { Router } from 'express';
import { usersLoginController } from '../controllers/users';
import { validateBody } from '../middlewares/validateBody';
import { loginSchema } from '../schemas/users';

export const loginRoutes: Router = Router();

loginRoutes.post('', validateBody(loginSchema), usersLoginController);
