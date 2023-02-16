import { hash } from 'bcryptjs';
import format from 'pg-format';

import { client } from '../../database/config';
import { AppError } from '../../errors';
import { tUpdateRequest, tUserResult, tUserWithoutPwd } from '../../interfaces/users';
import { UserWithoutPwdSchema } from '../../schemas/users';

export const userUpdateService = async (payload: tUpdateRequest, paramsId: number): Promise<tUserWithoutPwd> => {

    if (payload.password) {
        const hashedPwd: string = await hash(payload.password, 10);
        payload.password = hashedPwd;
    }

    if (!Object.keys(payload).length) {
        throw new AppError('Missing request body');
    }

    const queryString: string = format(`
        UPDATE
            users
        SET(%I) = ROW(%L)
        WHERE id = %s
        RETURNING *;
    `,
        Object.keys(payload),
        Object.values(payload),
        paramsId
    );

    const queryResult: tUserResult = await client.query(queryString);

    return UserWithoutPwdSchema.parse(queryResult.rows[0]);
};