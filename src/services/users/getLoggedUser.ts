import format from 'pg-format';
import { client } from '../../database/config';
import { tUserResult, tUserWithoutPwd } from '../../interfaces/users';
import { UserWithoutPwdSchema } from '../../schemas/users';

export const getLoggedUserService = async (userEmail: string | void): Promise<tUserWithoutPwd> => {

    const queryString: string = format(`
        SELECT * FROM users WHERE email = %L;
    `,
        userEmail
    );

    const queryResult: tUserResult = await client.query(queryString);

    return UserWithoutPwdSchema.parse(queryResult.rows[0]);
};