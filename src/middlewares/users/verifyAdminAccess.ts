import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import format from 'pg-format';

import { client } from '../../database/config';
import { tUserResult } from '../../interfaces/users';

import 'dotenv/config';

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

    req.isAdmin = queryResult.rows[0].admin!;

    return next();
};