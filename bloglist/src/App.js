import React from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification/Notification";

import { useDispatch, useSelector } from "react-redux";
import { initializeUser } from './reducers/userReducer';
import { initializeBlogs } from "./reducers/blogsReducer";

const App = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(initializeUser())
  }, []);
  const user = useSelector(state => state.user)

  React.useEffect(() => {
    dispatch(initializeBlogs())
  }, []);

  // const onLike = (newBlog) => {
  //   const updatedBlogs = blogs.map((blog) => {
  //     if (blog.id === newBlog.id) {
  //       return {
  //         ...blog,
  //         likes: newBlog.likes,
  //       };
  //     } else {
  //       return blog;
  //     }
  //   });
  //   updatedBlogs.sort((a, b) => b.likes - a.likes);
  //   setBlogs(updatedBlogs);
  //   dispatch(showNotification([`${newBlog.title} is liked`]))
  // };

  return (
    <div>
      <Notification />
      {user === null ? (<LoginForm />) : (<Blogs/>)}
    </div>
  );
};

export default App;
