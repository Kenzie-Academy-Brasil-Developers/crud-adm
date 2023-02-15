import { NextFunction, Request, Response } from 'express';
import format from 'pg-format';
import { client } from '../../database/config';
import { AppError } from '../../errors';
import { UserOnlyWithEmailResult } from '../../interfaces/users';

export const checkUserEmail = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    if (req.body.email) {

        const queryString: string = format(`
            SELECT users.email FROM users WHERE email = %L;
        `,
            req.body.email
        );

        const queryResult: UserOnlyWithEmailResult = await client.query(queryString);

        if (queryResult.rowCount) {
            throw new AppError('E-mail already registered', 409);
        }

    }
    return next();
};