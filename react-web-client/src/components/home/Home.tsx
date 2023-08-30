import { AuthHeader, Method } from "../../util/header/auth.header"
import { useEffect, useState } from 'react'
import { UserProps } from "../../util/interfaces/user.interface";
import { getUserRole } from "../../util/services/auth.service";

export const Home = () => {
    const [user, setUser] = useState<UserProps[]>();
    const role = getUserRole();
    
    useEffect(()=>{
        fetch("http://127.0.0.1:8080/user", AuthHeader(Method.GET))
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(e => console.log(e))
    }, [])

    return (
        <div>
            Home Page
            <br></br>
            <div>
                {role}
            </div>
        </div>
    )
}