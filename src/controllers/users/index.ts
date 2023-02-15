import { Request, Response } from 'express';
import { tUserRequest } from '../../interfaces/users';
import { createUsersService } from '../../services/users/createUsers';

export const createUsersController = async (req: Request, res: Response): Promise<Response> => {
    const body: tUserRequest = req.body;

    const userData = await createUsersService(body);

    return res.status(201).json(userData);
};