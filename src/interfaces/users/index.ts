export interface IUserRequest {
    name: string;
    email: string;
    password: string;
    admin: boolean;
    active: boolean;
}

export interface IUser extends IUserRequest {
    id: number
}