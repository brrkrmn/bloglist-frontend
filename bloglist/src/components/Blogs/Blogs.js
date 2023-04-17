import React from 'react';
import Blog from '../Blog'
import BlogForm from '../BlogForm/BlogForm';
import styles from './Blogs.module.css'

const Blogs = ({ blogs, setBlogs, user, handleLogout, setMessage }) => {
  return (
    <div>
      <h3>{user.username} is logged in</h3>
      <button onClick={handleLogout}>Log Out</button>
      
      <h1>Blogs</h1>
      <BlogForm setBlogs={setBlogs} blogs={blogs} setMessage={setMessage} />
      <div className={styles.blogsWrapper}>
        {blogs.map(blog => {
          return (
            <div className={styles.blog}>
              <Blog key={blog.id} blog={blog} />
            </div>
          )
        })}
      </div>

    </div>   
  )
}

export default Blogs;
