import { useState } from "react";
import { loginRequest } from "../../util/services/auth.service";
import { Link, NavigateFunction, useNavigate  } from "react-router-dom";

export const Login = () => {

    const [User, setUser]  = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const loginStatus = sessionStorage.getItem("LoginStatus");
    let history:NavigateFunction = useNavigate();

    const userHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setUser(String(value));
    }

    const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPassword(String(value));
    }
    
    const loginHandler = (e:any) => {
        e.preventDefault();
        let userLower = User.toLocaleLowerCase();
        const user = {
            email: userLower,
            password: Password  
        }
        loginRequest(user).then(() => {history('/')});
    }
 
    return (
        <div className="my-auto">
            <img src="logo/full-logo.png"></img>
            <form className="w-50 m-auto" onSubmit={loginHandler}>
                <div>{loginStatus}</div>
                <div className="form-group row">
                    <label className="col-sm-2" >Email address</label>
                    <input type="email" value={User} onChange={userHandler} className="form-control col-sm-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2">Password</label>
                    <input type="password" value={Password} onChange={passwordHandler}  className="form-control col-sm-10" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label">Keep me logged in</label>
                </div>
                <div>
                    <button type="submit" className="btn btn-dark col-sm-2 mr-5">Login</button>
                    <Link to="/register" className="btn btn-dark col-sm-2">Register</Link>
                </div>
            </form>
        </div>
    )
}