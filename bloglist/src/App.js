import React from "react";
import { Routes, Route, useMatch } from 'react-router-dom'

import LoginForm from "./components/LoginForm/LoginForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification/Notification";
import Menu from "./components/Menu/Menu";
import UserInfo from "./components/UserInfo/UserInfo";
import Users from "./components/Users/Users";
import User from "./components/User/User";

import { useDispatch, useSelector } from "react-redux";
import { initializeUser } from './reducers/userReducer';
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeUsers } from "./reducers/usersReducer";

const App = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(initializeUser())
  }, []);
  const loggedInUser = useSelector(state => state.user)

  React.useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, []);
  const users = useSelector(state => state.users)

  const match = useMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  return (
    <div>
      <Notification />
      {loggedInUser
        ? (
          <div>
            <UserInfo />
            <Menu />
          </div>
        )
        : (<LoginForm />)
      }

      <Routes>
        <Route path='/blogs' element={<Blogs />} />
        <Route path ='/users' element={<Users />} />
        <Route path='/users/:id' element={<User user={user} />}/>
      </Routes>
    </div>
  );
};

export default App;
