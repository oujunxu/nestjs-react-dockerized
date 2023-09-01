import { UserProps } from "../interfaces/user.interface";

export enum Method {
    POST = 'POST',
    GET = 'GET',
    DELETE = 'DELETE',
    PUT = 'PUT'
}

export type HeaderType = {
    method?: Method,
    headers?: {
        'Content-type': string,
        Authorization: string,
        Accept?: string
    },
    body?: string 
}

export const AuthHeader = (method:Method, body?:UserProps) => {
    const token = JSON.parse(String(localStorage.getItem('JWT_AUTH'))).access_token;
    let authHeader:HeaderType = {};

    if(token){
        authHeader = 
        {
            method: method,
            headers: {
                'Content-type': 'application/json',
                Authorization: `bearer ${token}`
            }
        }

        if(body){
            authHeader['body'] = JSON.stringify(body);
        }
    }

    return authHeader;
}
