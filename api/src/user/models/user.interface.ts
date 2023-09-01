export interface UserI {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    roles?: UserRole;
}

export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager',
    EDITOR = 'editor',
    USER = 'user'
}