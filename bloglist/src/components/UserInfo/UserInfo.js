import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../reducers/userReducer";

const UserInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(removeUser())
  }

  return (
    <div>
      <h3>{user.username} is logged in</h3>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default UserInfo;