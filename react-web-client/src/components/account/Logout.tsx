import { useNavigate } from "react-router-dom";
import { logOut } from "../../util/services/auth.service"


export const LogOut = () => {
    const history = useNavigate();
    const logOutHandler = () => {
        logOut();
        history("/login");
    }

    return (<button className="dropdown-item" onClick={logOutHandler}>Log out</button>)
}