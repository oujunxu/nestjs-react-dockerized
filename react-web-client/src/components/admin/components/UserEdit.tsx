import { useEffect, useState } from "react";
import { UserProps, UserRole } from "../../../util/interfaces/user.interface";
import { useParams } from "react-router-dom";
import { AuthHeader, Method } from "../../../util/header/auth.header";

export const UserEdit = () => {
    const [data, setData] = useState({});
    const [tempUser, setTempUser ] = useState<UserProps>();

    const { id } = useParams();

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/${id}`)
        .then((res) => res.json())
        .then((data:UserProps) => {
            setTempUser(data);
        })
        .catch(error => console.log(error));
    },[])

    const editHandler = () => {

        fetch(`${process.env.REACT_APP_SERVER_URL}/user/${id}/admin/update`, AuthHeader(Method.PUT, {name: tempUser?.name, roles: tempUser?.roles}))
        .then((res) => res.json())
        .then((data)=>{setData(data); localStorage.setItem("data", JSON.stringify(data))})
        .catch((e) => console.error('error', e))
    }

    return (
        <div className="text-left">
            <form className="col-sm-5 m-auto" onSubmit={editHandler}>
                <div className="card">
                    <div className="form-group card-body">
                        <label className="">Email</label>
                        <input 
                            type="email" 
                            value={tempUser?.email || ""} 
                            className="form-control"
                            readOnly
                            />
                    </div>
                    <div className="form-group card-body">
                        <label className="">Name</label>
                        <input 
                            type="text" 
                            value={tempUser?.name || ""} 
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
                            value={tempUser?.roles || ""} 
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