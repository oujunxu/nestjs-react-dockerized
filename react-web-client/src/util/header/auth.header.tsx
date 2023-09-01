import { UserProps } from "../interfaces/user.interface";

export enum Method {
    POST = 'POST',
    GET = 'GET',
    DELETE = 'DELETE',
    PUT = 'PUT'
}

export const AuthHeader = (method:Method) => {
    const token = JSON.parse(String(localStorage.getItem('JWT_AUTH'))).access_token;
    let authHeader = {};

    if(token){
        authHeader = 
        {
            method: method,
            headers: {
                Accept: 'application/json',
                Authentication: `bearer ${token}`
            }
        }
    }

    return authHeader;
}
