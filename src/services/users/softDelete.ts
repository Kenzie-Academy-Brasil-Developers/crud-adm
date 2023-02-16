import format from 'pg-format';
import { client } from '../../database/config';
import { AppError } from '../../errors';
import { tUserResult } from '../../interfaces/users';

export const softDeleteService = async (id: number): Promise<void> => {

    const queryStringToValidate: string = format(`
            SELECT * FROM users WHERE id = %s;
        `,
        id
    );

    const queryResult: tUserResult = await client.query(queryStringToValidate);

    if (!queryResult.rows[0].active) {
        throw new AppError('User already inactive', 400);
    }

    const queryString: string = format(`
        UPDATE
            users
        SET
            active = false
        WHERE id = %s;
    `,
        id
    );

    await client.query(queryString);
};