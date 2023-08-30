import { redirect } from "react-router-dom";
import { UserCredProps, UserProps, UserRole } from "../interfaces/user.interface";
import jwt_decode from "jwt-decode";

export const loginRequest = async (props: UserProps) => {
    await fetch("http://127.0.0.1:8080/user/login", {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            email: props.email,
            password: props.password
        })
    }).then((response) => response.json())
      .then(data => {
        const cred:UserCredProps = jwt_decode(data.access_token);
        if(cred.user.email === props.email){
            localStorage.setItem("JWT_AUTH", JSON.stringify(data));
            sessionStorage.removeItem("LoginStatus");
        }else{
            console.log("Wrong credentials!");
        }
    })
      .catch(
        error => {
            console.log(error);
            sessionStorage.setItem("LoginStatus","Wrong password/email, try again!");
        }
        );
}

export const registerRequest = async (props: UserProps) => {
    await fetch("http://127.0.0.1:8080/user", {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            name: props.name,
            email: props.email,
            password: props.password,
        })
    }).then((response) => response.json())
      .then(data => console.log(data))
      .catch(error => {console.log(error)});
}

export const logOut = () => {
    localStorage.clear();
}

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("JWT_AUTH");
    return token!=null;
}

export const getTokenString = ():string => {
    const token = localStorage.getItem("JWT_AUTH");
    let accessKey:string = "";
    if(token){
        accessKey = JSON.parse(String(localStorage.getItem("JWT_AUTH"))).access_token;
    }
    return accessKey;
}

export const getUserRole = (): UserRole => {
    const accessKey:string = getTokenString();
    const userCred:UserCredProps = jwt_decode(accessKey);
    let userRole:UserRole;

    switch(userCred.user.roles){
        case 'admin':
            userRole = UserRole.ADMIN;
            break;
        case 'manager':
            userRole = UserRole.MANAGER;
            break;
        case 'editor':
            userRole = UserRole.EDITOR;
            break;
        default:
            userRole = UserRole.USER;
    }

    return userRole;
}