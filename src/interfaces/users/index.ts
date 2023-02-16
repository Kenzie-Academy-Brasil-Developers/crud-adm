import { QueryResult } from 'pg';
import { z } from 'zod';
import { loginSchema, UserOnlyWithEmailSchema, userRequestSchema, userSchema, userUpdateSchema, UserWithoutPwdSchema } from '../../schemas/users';

export interface IToken {
    token: string;
}

export type tUserRequest = z.infer<typeof userSchema>;
export type tUser = z.infer<typeof userRequestSchema>;
export type tUserWithoutPwd = z.infer<typeof UserWithoutPwdSchema>;
export type tLogin = z.infer<typeof loginSchema>;
export type tUpdateRequest = z.infer<typeof userUpdateSchema>;

export type tUserResult = QueryResult<tUser>;
export type tUserOnlyWithEmailResult = QueryResult<z.infer<typeof UserOnlyWithEmailSchema>>;