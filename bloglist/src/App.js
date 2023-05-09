import React from "react";
import { Routes, Route, useMatch } from 'react-router-dom'

import LoginForm from "./components/LoginForm/LoginForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification/Notification";
import Menu from "./components/Menu/Menu";
import UserInfo from "./components/UserInfo/UserInfo";
import Users from "./components/Users/Users";
import User from "./components/User/User";
import Blog from "./components/Blog/Blog";
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

  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogs = useSelector(state => state.blogs)
  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
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
        : (<LoginForm/>)
      }

      <Routes>
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blogs/:id' element={<Blog blog={blog} />} />
        <Route path ='/users' element={<Users />} />
        <Route path='/users/:id' element={<User user={user} />}/>
      </Routes>
    </div>
  );
};

export default App;
