import { Router } from 'express';

import { activateUserController, createUsersController, getAllUsersController, getLoggedUserController, softDeleteController, usersLoginController, userUpdateController } from '../../controllers/users';
import { checkPermission, checkUserEmail, checkUserId, verifyAdminAccess, verifyToken } from '../../middlewares/users';
import { validateBody } from '../../middlewares/validateBody';
import { loginSchema, userSchema, userUpdateSchema } from '../../schemas/users';

export const userRoutes: Router = Router();
export const loginRoute: Router = Router();

userRoutes.post('', validateBody(userSchema), checkUserEmail, createUsersController);
userRoutes.get('', verifyToken, verifyAdminAccess, getAllUsersController);
userRoutes.get('/profile', verifyToken, getLoggedUserController);
userRoutes.patch('/:id', validateBody(userUpdateSchema), checkUserId, checkUserEmail, verifyToken, verifyAdminAccess, checkPermission, userUpdateController);
userRoutes.delete('/:id', checkUserId, verifyToken, verifyAdminAccess, checkPermission, softDeleteController);
userRoutes.put('/:id/recover', checkUserId, verifyToken, verifyAdminAccess, activateUserController);

loginRoute.post('', validateBody(loginSchema), usersLoginController);