import React from "react";
import BlogForm from "../BlogForm/BlogForm";
import styles from "./Blogs.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <h1>Blogs</h1>
      <BlogForm />
      <div className={styles.blogsWrapper}>
        {blogs.map((blog) => {
          return (
            <Link to={`/blogs/${blog.id}`} key={blog.id} className={styles.blog}>
              {blog.title} by {blog.author}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
