import { hash } from 'bcryptjs';
import format from 'pg-format';
import { client } from '../../database/config';

import { tUserRequest, tUserResult, tUserWithoutPwd } from '../../interfaces/users';
import { UserWithoutPwdSchema } from '../../schemas/users';

export const createUsersService = async (payload: tUserRequest): Promise<tUserWithoutPwd> => {

    const hashedPwd: string = await hash(payload.password, 10);
    payload.password = hashedPwd;

    const queryString: string = format(`
        INSERT INTO
            users(%I)
        VALUES(%L)
        RETURNING *;
    `,
        Object.keys(payload),
        Object.values(payload)
    );

    const queryResult: tUserResult = await client.query(queryString);

    const newPayload: tUserWithoutPwd = {
        ...queryResult.rows[0],
        active: true
    };

    return UserWithoutPwdSchema.parse(newPayload);
};