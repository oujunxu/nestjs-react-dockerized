import { Routes, Route, NavLink, BrowserRouter, Router } from 'react-router-dom';
import { RouteType } from '../routes/types/RouteType';
import { AdminGuard } from '../routes/AdminGuard';
import { User } from './components/User';


export const AdminBase = (props:RouteType) => {
    return (
        <div className="row mt-5 ml-0 mr-0">
            <div className='col-sm-2'>
                <h3>Admin Board</h3>
                <ul className="list-group">
                    <NavLink to="/admin/user" className={({isActive}) => isActive ? "list-group-item active-dark" : "list-group-item"}>User</NavLink>
                    <NavLink to="/admin/setting" className={({isActive}) => isActive ? "list-group-item active-dark" : "list-group-item"}>Settings</NavLink>
                </ul>
            </div>
            <div className='col-sm-10'>
                {props.children}
            </div>
        </div>
    );
}