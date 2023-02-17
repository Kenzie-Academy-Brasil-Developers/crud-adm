import { NextFunction, Request, Response } from 'express';

import { AppError } from '../../errors';

export const checkPermission = (req: Request, res: Response, next: NextFunction): Response | void => {
    const isAdmin: boolean = req.isAdmin;
    const userId: number = req.userId;
    const paramsId: number = parseInt(req.params.id);

    if (userId != paramsId && !isAdmin) {
        throw new AppError('Insufficient Permission', 403);
    }

    return next();
};