import React from 'react';
import Blog from '../Blog'
import BlogForm from '../BlogForm/BlogForm';
import styles from './Blogs.module.css'

const Blogs = ({ blogs, user, handleLogout, onCreate, onLike, onDelete }) => {
  return (
    <div>
      <h3>{user.username} is logged in</h3>
      <button onClick={handleLogout}>Log Out</button>
      
      <h1>Blogs</h1>
      <BlogForm user={user} onCreate={onCreate} />
      <div className={styles.blogsWrapper}>
        {blogs.map(blog => {
          return (
            <div key={blog.id} className={styles.blog}>
              <Blog blog={blog} user={user} onLike={onLike} onDelete={onDelete} />
            </div>
          )
        })}
      </div>

    </div>   
  )
}

export default Blogs;
