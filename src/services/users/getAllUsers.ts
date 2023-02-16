import { QueryResult } from 'pg';
import format from 'pg-format';
import { client } from '../../database/config';
import { tUserWithoutPwd } from '../../interfaces/users';
import { allUsersSchema } from '../../schemas/users';

export const getAllUsersService = async (): Promise<tUserWithoutPwd[]> => {
    const queryString: string = format(`
        SELECT * FROM users;
    `);

    const queryResult: QueryResult = await client.query(queryString);

    return allUsersSchema.parse(queryResult.rows);
};