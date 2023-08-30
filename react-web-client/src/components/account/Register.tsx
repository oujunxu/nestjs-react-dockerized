import { useState } from "react"
import { registerRequest } from "../../util/services/auth.service";
import { UserProps } from "../../util/interfaces/user.interface";

export const Register = () => {
    const [Email, setEmail] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [Name, setName] = useState<string>("");

    const registerHandler = () => {
        const user: UserProps = {
            name: Name,
            email: Email,
            password: Password
        }
        try{
            registerRequest(user);
        }catch(err){
            console.log(err);
        }finally{

        }
    }
    
    return (
        <div className="my-auto">
            <img src="logo/full-logo.png"></img>
            <form className="w-50 m-auto">
                <div className="form-group row">
                    <label className="col-sm-2" >Name</label>
                    <input type="text" value={Name} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setName(event.target.value)} className="form-control col-sm-10" id="exampleInputName"  placeholder="Enter name"/>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2" >Email address</label>
                    <input type="email" value={Email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} className="form-control col-sm-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2">Password</label>
                    <input type="password" value={Password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}  className="form-control col-sm-10" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div>
                    <button onClick={registerHandler} className="btn btn-dark col-sm-2 mr-5">Sign Up</button>
                </div>
            </form>
        </div>
    )
}