import { QueryResult } from 'pg';

export interface IUserRequest {
    name: string;
    email: string;
    password: string;
    admin: boolean;
    active: boolean;
}

export interface IUser extends IUserRequest {
    id: number;
}

export type UserWithoutPwd = Omit<IUser, 'password'>;
export type UserResult = QueryResult<UserWithoutPwd>;
export type UserOnlyWithEmailResult = QueryResult<Pick<IUser, 'email'>>;