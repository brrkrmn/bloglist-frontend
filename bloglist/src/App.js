import React from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm/LoginForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification/Notification";

import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "./reducers/notificationReducer";
import { initializeUser } from './reducers/userReducer';

const App = () => {
  const [blogs, setBlogs] = React.useState([]);
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(initializeUser())
  }, []);

  const user = useSelector(state => state.user)
  React.useEffect(() => {
    getAllBlogs();
  }, []);

  const getAllBlogs = async () => {
    const response = await blogService.getAll();
    let initialBlogs = [];
    response.map((blog) => {
      const newBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
        url: blog.url,
        id: blog.id,
        user: blog.user,
      };
      initialBlogs.push(newBlog);
      initialBlogs.sort((a, b) => b.likes - a.likes);
      return initialBlogs;
    });
    setBlogs(initialBlogs);
  };

  const onCreate = (newBlog) => {
    const updatedBlogs = [...blogs, newBlog];
    updatedBlogs.sort((a, b) => b.likes - a.likes);
    setBlogs(updatedBlogs);
    getAllBlogs();
    dispatch(showNotification([`New blog ${newBlog.title} by ${newBlog.author} is added`]))
  };

  const onLike = (newBlog) => {
    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === newBlog.id) {
        return {
          ...blog,
          likes: newBlog.likes,
        };
      } else {
        return blog;
      }
    });
    updatedBlogs.sort((a, b) => b.likes - a.likes);
    setBlogs(updatedBlogs);
    dispatch(showNotification([`${newBlog.title} is liked`]))
  };

  const onDelete = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    dispatch(showNotification(['Blog deleted']))
  };

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <Blogs
          blogs={blogs}
          setBlogs={setBlogs}
          onCreate={onCreate}
          onLike={onLike}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default App;
