import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import format from 'pg-format';

import { client } from '../../database/config';
import { AppError } from '../../errors';
import { tUserOnlyWithEmailResult, tUserResult } from '../../interfaces/users';

export const checkUserEmail = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    if (req.body.email) {

        const queryString: string = format(`
            SELECT users.email FROM users WHERE email = %L;
        `,
            req.body.email
        );

        const queryResult: tUserOnlyWithEmailResult = await client.query(queryString);

        if (queryResult.rowCount) {
            throw new AppError('E-mail already registered', 409);
        }

    }
    return next();
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const authToken = req.headers.authorization;

    if (!authToken || authToken?.length === 6) {
        throw new AppError('Missing Bearer Token', 401);
    }

    const token: string = authToken.split(' ')[1];

    const userEmail: string | void = verify(
        token,
        String(process.env.SECRET_KEY),
        (error: any, decoded: any) => {
            if (error) throw new AppError(error.message, 401);
            return decoded.email;
        }
    );

    req.userEmail = userEmail;

    return next();
};

export const verifyAdminAccess = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const authToken = req.headers.authorization!;
    const token: string = authToken.split(' ')[1];

    const userEmail: string | void = verify(
        token,
        String(process.env.SECRET_KEY),
        (error: any, decoded: any) => decoded.email
    );

    const queryString: string = format(`
        SELECT * FROM users WHERE email = %L;
    `,
        userEmail
    );

    const queryResult: tUserResult = await client.query(queryString);

    if (!queryResult.rows[0].admin) {
        throw new AppError('Insufficient Permission', 403);
    }

    return next();
};