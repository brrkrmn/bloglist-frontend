import React from "react";
import Blog from "../Blog";
import BlogForm from "../BlogForm/BlogForm";
import styles from "./Blogs.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../reducers/userReducer";

const Blogs = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(removeUser())
  }

  return (
    <div>
      <h3>{user.username} is logged in</h3>
      <button onClick={handleLogout}>Log Out</button>
      <h1>Blogs</h1>
      <BlogForm />
      <div className={styles.blogsWrapper}>
        {blogs.map((blog) => {
          return (
            <div key={blog.id} className={styles.blog}>
              <Blog
                blog={blog}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
