import format from 'pg-format';

import { client } from '../../database/config';
import { tUserRequest, tUserResult, tUserWithoutPwd } from '../../interfaces/users';

export const createUsersService = async (body: tUserRequest): Promise<tUserWithoutPwd> => {

    const queryString: string = format(`
        INSERT INTO
            users(%I)
        VALUES(%L)
        RETURNING id, "name", email, "admin", active;
    `,
        Object.keys(body),
        Object.values(body)
    );

    const QueryResult: tUserResult = await client.query(queryString);

    return QueryResult.rows[0];
};