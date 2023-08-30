import { UserProps } from '../../../util/interfaces/user.interface';
import { useQuery } from 'react-query';
import { AuthHeader, Method } from '../../../util/header/auth.header';
import { Link } from 'react-router-dom';

const fetchUsers = async() => {
    const res = await fetch(process.env.REACT_APP_SERVER_URL + '/user?page=1&limit=10', AuthHeader(Method.GET))
    return res.json();
}

export const User = () => {
    const { data, status }= useQuery('items', fetchUsers);
    return (
    <>
        {status === "error" && <p>Error fetching data</p>}

        {status === "loading" && <p>Fetching data...</p>}

        {status === "success" && (
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.items.map((user:UserProps) => (
                            <tr key={user.id}>
                                <td>
                                    <Link to={String(user.id)} className="link-dark text-decoration-none">{user.id}</Link>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.roles}</td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        )}
    </>
    );
}