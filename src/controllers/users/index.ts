import { Request, Response } from 'express';

import { tLogin, tUpdateRequest, tUserRequest } from '../../interfaces/users';
import { activateUserService } from '../../services/users/activateUser';
import { createUsersService } from '../../services/users/createUsers';
import { getAllUsersService } from '../../services/users/getAllUsers';
import { getLoggedUserService } from '../../services/users/getLoggedUser';
import { softDeleteService } from '../../services/users/softDelete';
import { usersLoginService } from '../../services/users/usersLogin';
import { userUpdateService } from '../../services/users/userUpdate';

export const createUsersController = async (req: Request, res: Response): Promise<Response> => {
    const body: tUserRequest = req.body;

    const userData = await createUsersService(body);

    return res.status(201).json(userData);
};

export const usersLoginController = async (req: Request, res: Response): Promise<Response> => {
    const body: tLogin = req.body;

    const token = await usersLoginService(body);

    return res.json(token);
};

export const getAllUsersController = async (req: Request, res: Response): Promise<Response> => {
    const users = await getAllUsersService(req.isAdmin);

    return res.json(users);
};

export const getLoggedUserController = async (req: Request, res: Response): Promise<Response> => {
    const user = await getLoggedUserService(req.userEmail);

    return res.json(user);
};

export const userUpdateController = async (req: Request, res: Response): Promise<Response> => {
    const body: tUpdateRequest = req.body;
    const paramsId: number = parseInt(req.params.id);

    const updatedUser = await userUpdateService(body, paramsId);

    return res.json(updatedUser);
};

export const softDeleteController = async (req: Request, res: Response): Promise<Response> => {
    const id: number = parseInt(req.params.id);

    await softDeleteService(id);

    return res.status(204).send();
};

export const activateUserController = async (req: Request, res: Response): Promise<Response> => {
    const id: number = parseInt(req.params.id);
    const isAdmin: boolean = req.isAdmin;

    const user = await activateUserService(id, isAdmin);

    return res.json(user);
};