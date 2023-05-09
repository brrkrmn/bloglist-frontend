import React from "react";
import Blog from "../Blog";
import BlogForm from "../BlogForm/BlogForm";
import styles from "./Blogs.module.css";
import { useSelector } from "react-redux";

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <h1>Blogs</h1>
      <BlogForm />
      <div className={styles.blogsWrapper}>
        {blogs.map((blog) => {
          return (
            <div key={blog.id} className={styles.blog}>
              <Blog blog={blog} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
