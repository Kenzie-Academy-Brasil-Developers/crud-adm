import { QueryResult } from 'pg';
import { z } from 'zod';
import { loginSchema, UserOnlyWithEmailSchema, userRequestSchema, userSchema, UserWithoutPwdSchema } from '../../schemas/users';

export type tUserRequest = z.infer<typeof userSchema>;
export type tUser = z.infer<typeof userRequestSchema>;
export type tUserWithoutPwd = z.infer<typeof UserWithoutPwdSchema>;
export type tLogin = z.infer<typeof loginSchema>;

export type tUserResult = QueryResult<tUserWithoutPwd>;
export type tUserOnlyWithEmailResult = QueryResult<z.infer<typeof UserOnlyWithEmailSchema>>;