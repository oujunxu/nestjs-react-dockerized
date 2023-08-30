import { Navigate } from "react-router-dom";
import { RouteType } from "./types/RouteType";
import { getUserRole } from "../../util/services/auth.service";
import { RouteGuard } from "./RouteGuard";
import { AdminBase } from "../admin/AdminBase";

export const AdminGuard = (props:RouteType) => {
    const role = getUserRole();

    return role === 'admin' ? <RouteGuard><AdminBase>{props.children}</AdminBase></RouteGuard> : <Navigate to="/"/>
}