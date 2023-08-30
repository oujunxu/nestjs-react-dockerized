import { Navigate } from "react-router-dom";
import { RouteType } from "./types/RouteType";
import jwtDecode, {JwtPayload} from "jwt-decode";
import { useRef } from "react"

export const LoginGuard = (props:RouteType) => {
  const isAuth = useRef<boolean>();
  let token = localStorage.getItem("JWT_AUTH");

  if(token){
    console.log(token?.split(':')[1])
    try{
      let tokenDecode = jwtDecode<JwtPayload>(token?.split(':')[1]).exp;    
      console.log(tokenDecode)
      let dateNow = new Date();
      console.log(dateNow.getTime()/1000)

      if(Number(tokenDecode) < dateNow.getTime()/1000){
        isAuth.current = false;
      }else{
        isAuth.current = true;
      }

    }catch(e){console.log(e)}
  }else{
    isAuth.current = false;
  }

  return isAuth.current==false ?  props.children : <Navigate to="/"/>
}