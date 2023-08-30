import { NavLink } from 'react-router-dom'
import { getUserRole } from '../../util/services/auth.service'
import { LogOut } from '../account/Logout'
import './CSS/style.css'

export const Navigation = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/"><img width="150px" src="logo/logo.png"/></NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/ex1">Link</NavLink>
                </li>
                <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" to="/ex2" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                    </NavLink>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <LogOut />
                    <NavLink className="dropdown-item" to="/ex3">Another action</NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink className="dropdown-item" to="/ex4">Something else here</NavLink>
                    </div>
                </li>
                <li className="nav-item">
                    {getUserRole() === 'admin' && (<NavLink className="nav-link" to='/admin/user'>Admin</NavLink>)}
                </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        </nav>
    )
}