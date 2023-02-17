import { NextFunction, Request, Response } from 'express';
import format from 'pg-format';

import { client } from '../../database/config';
import { AppError } from '../../errors';
import { tUserResult } from '../../interfaces/users';

export const checkUserId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const queryString: string = format(`
        SELECT * FROM users WHERE id = %s;
    `,
        req.params.id
    );

    const queryResult: tUserResult = await client.query(queryString);

    if (!queryResult.rowCount) {
        throw new AppError('User not found', 404);
    }

    return next();
};