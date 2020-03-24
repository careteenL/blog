import React, { useState, useEffect } from 'react';
import { Link } from '../react-router-dom';
export default function (props) {
    let [users, setUsers] = useState([]);
    useEffect(() => {
        let usersStr = localStorage.getItem('users');
        let users = usersStr ? JSON.parse(usersStr) : [];
        setUsers(users);
    }, []);
    return (
        <ul className="list-group">
            {
                users.map(user => (<li className="list-group-item" key={user.id}>
                    <Link to={{ pathname: `/user/detail/${user.id}`, state: user }}>{user.username}</Link>
                </li>))
            }
        </ul >
    )
}


/* class UserList extends React.Component {
    state = { users: [] }
    componentDidMount() {
        let usersStr = localStorage.getItem('users');
        let users = usersStr ? JSON.parse(usersStr) : [];
        this.setState({ users });
    }
    render() {
        <ul className="list-group">
            {
                this.state.users.map(user => (<li className="list-group-item" key={user.id}>{user.username}</li>))
            }
        </ul>
    }
} */