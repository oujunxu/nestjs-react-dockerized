export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager',
    EDITOR = 'editor',
    USER = 'user'
}

export interface UserProps {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    roles?: UserRole;
}

export interface UserCredProps{
    user: UserProps;
    iat: number;
    exp: number;
}

