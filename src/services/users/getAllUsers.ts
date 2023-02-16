import { QueryResult } from 'pg';
import format from 'pg-format';
import { client } from '../../database/config';
import { AppError } from '../../errors';
import { tUserWithoutPwd } from '../../interfaces/users';
import { allUsersSchema } from '../../schemas/users';

export const getAllUsersService = async (isAdmin: boolean): Promise<tUserWithoutPwd[]> => {
    if (!isAdmin) {
        throw new AppError('Insufficient Permission', 403);
    }

    const queryString: string = format(`
        SELECT * FROM users;
    `);

    const queryResult: QueryResult = await client.query(queryString);

    return allUsersSchema.parse(queryResult.rows);
};