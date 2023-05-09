import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => {
          return(
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>
                {user.username}, blogs: {user.blogs.length}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Users;