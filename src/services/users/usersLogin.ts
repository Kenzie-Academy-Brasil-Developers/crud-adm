import { compare } from 'bcryptjs';
import 'dotenv/config';
import { sign } from 'jsonwebtoken';
import format from 'pg-format';
import { client } from '../../database/config';
import { AppError } from '../../errors';
import { IToken, tLogin, tUserResult } from '../../interfaces/users';

export const usersLoginService = async (payload: tLogin): Promise<IToken> => {

    const queryString: string = format(`
            SELECT * FROM users WHERE email = %L;
        `,
        payload.email
    );

    const queryResult: tUserResult = await client.query(queryString);


    if (!queryResult.rowCount || !queryResult.rows[0].active) {
        throw new AppError('Wrong email/password', 401);
    }

    const pwdMatch: boolean = await compare(payload.password, queryResult.rows[0].password);

    if (!pwdMatch) {
        throw new AppError('Wrong email/password', 401);
    }

    const token: string = sign(
        { email: queryResult.rows[0].email },
        String(process.env.SECRET_KEY),
        { expiresIn: '24h', subject: String(queryResult.rows[0].id) }
    );

    return { token };
};