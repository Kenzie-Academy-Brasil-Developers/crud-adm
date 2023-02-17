import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../../errors';

import 'dotenv/config';

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const authToken = req.headers.authorization;

    if (!authToken || authToken?.length === 6) {
        throw new AppError('Missing Bearer Token', 401);
    }
    
    const token: string = authToken.split(' ')[1];

    const tokenInfo: any = verify(
        token,
        String(process.env.SECRET_KEY),
        (error: any, decoded: any) => {
            if (error) throw new AppError(error.message, 401);
            return decoded;
        }
    );

    req.userEmail = tokenInfo.email;
    req.userId = parseInt(tokenInfo.sub);

    return next();
};