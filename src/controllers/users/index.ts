import { Request, Response } from 'express';
import { tLogin, tUserRequest } from '../../interfaces/users';
import { createUsersService } from '../../services/users/createUsers';
import { loginUsersService } from '../../services/users/loginUsers';

export const createUsersController = async (req: Request, res: Response): Promise<Response> => {
    const body: tUserRequest = req.body;

    const userData = await createUsersService(body);

    return res.status(201).json(userData);
};

export const loginController = async (req: Request, res: Response): Promise<Response> => {
    const body: tLogin = req.body;

    const token = await loginUsersService(body);

    return res.json(token);
};