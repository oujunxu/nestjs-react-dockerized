import { UserProps } from "../interfaces/user.interface";

export enum Method {
    POST = 'POST',
    GET = 'GET',
    DELETE = 'DELETE',
    PUT = 'PUT'
}

export const AuthHeader = (method:Method, body?:UserProps) => {
    const token = JSON.parse(String(localStorage.getItem('JWT_AUTH'))).access_token;
    let authHeader = {};

    if(token){
        if(body)
            authHeader = 
            {
                method: method,
                headers: {
                    Accept: 'application/json',
                    Authentication: `bearer ${token}`
                },
                body
            }
        else{
            authHeader = 
            {
                method: method,
                headers: {
                    Accept: 'application/json',
                    Authentication: `bearer ${token}`
                }
            }
        }
    }

    return authHeader;
}
