import { Router } from 'express';

import { activateUserController, createUsersController, getAllUsersController, getLoggedUserController, softDeleteController, userUpdateController } from '../../controllers/users';
import { checkPermission } from '../../middlewares/users/checkPermission';
import { checkUserEmail } from '../../middlewares/users/checkUserEmail';
import { checkUserId } from '../../middlewares/users/checkUserId';
import { verifyAdminAccess } from '../../middlewares/users/verifyAdminAccess';
import { verifyToken } from '../../middlewares/users/verifyToken';
import { validateBody } from '../../middlewares/validateBody';
import { userSchema, userUpdateSchema } from '../../schemas/users';

export const userRoutes: Router = Router();

userRoutes.post('', validateBody(userSchema), checkUserEmail, createUsersController);
userRoutes.get('', verifyToken, verifyAdminAccess, getAllUsersController);
userRoutes.get('/profile', verifyToken, getLoggedUserController);
userRoutes.patch('/:id', validateBody(userUpdateSchema), checkUserId, checkUserEmail, verifyToken, verifyAdminAccess, checkPermission, userUpdateController);
userRoutes.delete('/:id', checkUserId, verifyToken, verifyAdminAccess, checkPermission, softDeleteController);
userRoutes.put('/:id/recover', checkUserId, verifyToken, verifyAdminAccess, activateUserController);