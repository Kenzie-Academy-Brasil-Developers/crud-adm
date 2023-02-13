import format from 'pg-format';
import { client } from '../../database/connection';
import { IUserRequest, UserResult, UserWithoutPwd } from '../../interfaces/users';

export const createUsersService = async (body: IUserRequest): Promise<UserWithoutPwd> => {

    const queryString: string = format(`
        INSERT INTO
            users(%I)
        VALUES(%L)
        RETURNING id, "name", email, "admin", active;
    `,
        Object.keys(body),
        Object.values(body)
    );

    const QueryResult: UserResult = await client.query(queryString);

    return QueryResult.rows[0];
};