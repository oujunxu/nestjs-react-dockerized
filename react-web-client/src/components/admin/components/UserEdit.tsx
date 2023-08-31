import { useEffect, useState } from "react";
import { UserProps, UserRole } from "../../../util/interfaces/user.interface";
import { useParams } from "react-router-dom";
import { AuthHeader, Method } from "../../../util/header/auth.header";

export const UserEdit = () => {
    const [user, setUser] = useState<UserProps>();
    const [tempUser, setTempUser ] = useState<UserProps>();

    const { id } = useParams();

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/${id}`)
        .then((res) => res.json())
        .then((data:UserProps) => {
            setUser(data);
            setTempUser(data);
        })
        .catch(error => console.log(error));
    },[])

    useEffect(()=>{
        setUser(tempUser);
    },[])

    const editHandler = () => {
        const body = {
            "name": user?.name,
            "roles": user?.roles
        };
        localStorage.setItem("user", JSON.stringify(body))
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/${id}/admin/update`, AuthHeader(Method.PUT)).then(() => window.location.replace("/admin/user"));
    }

    return (
        <div className="text-left">
            <form className="col-sm-5 m-auto" onSubmit={editHandler}>
                <div className="card">
                    <div className="form-group card-body">
                        <label className="">Email</label>
                        <input 
                            type="email" 
                            value={tempUser?.email} 
                            className="form-control"
                            readOnly
                            />
                    </div>
                    <div className="form-group card-body">
                        <label className="">Name</label>
                        <input 
                            type="text" 
                            value={tempUser?.name} 
                            className="form-control"
                            onChange={
                                (e:React.ChangeEvent<HTMLInputElement>)=>{
                                    setTempUser({...tempUser, name: e.target.value});
                                }}
                        />
                    </div>
                    <div className="form-group card-body">
                        <label className="">Role</label>
                        <select 
                            className="form-select form-control" 
                            value={tempUser?.roles} 
                            onChange={
                                (e:any)=>{
                                    setTempUser({...tempUser, roles: e.target.value});
                                }
                            }
                        >
                            <option value={UserRole.ADMIN}>Admin</option>
                            <option value={UserRole.MANAGER}>Manager</option>
                            <option value={UserRole.EDITOR}>Editor</option>
                            <option value={UserRole.USER}>User</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary float-right mr-4">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}