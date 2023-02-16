import format from 'pg-format';
import { client } from '../../database/config';
import { AppError } from '../../errors';
import { tUserResult, tUserWithoutPwd } from '../../interfaces/users';
import { UserWithoutPwdSchema } from '../../schemas/users';

export const activateUserService = async (id: number, isAdmin: boolean): Promise<tUserWithoutPwd> => {

    if (!isAdmin) {
        throw new AppError('Insufficient Permission', 403);
    }

    const queryStringToValidate: string = format(`
            SELECT * FROM users WHERE id = %s;
        `,
        id
    );

    const queryResultToValidate: tUserResult = await client.query(queryStringToValidate);

    if (queryResultToValidate.rows[0].active) {
        throw new AppError('User already active', 400);
    }

    const queryString: string = format(`
        UPDATE
            users
        SET
            active = true
        WHERE id = %s
        RETURNING *;
    `,
        id
    );

    const queryResult: tUserResult = await client.query(queryString);

    return UserWithoutPwdSchema.parse(queryResult.rows[0]);
};