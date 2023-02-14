import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

export const handleErrors = (error: Error, res: Response, req: Request, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
};