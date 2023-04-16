import React from 'react';
import Blog from '../Blog'

const Blogs = ({ blogs, user, handleLogout }) => {
  return (
    <div>
      <h1>Blogs</h1>

      <h3>{user.username} is logged in</h3>
      <button onClick={handleLogout}>Log Out</button>

      {blogs.map(blog => {
        return (
          <Blog key={blog.id} blog={blog} />
        )
      })}
    </div>   
  )
}

export default Blogs;
