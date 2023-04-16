import React from 'react';

const Blog = ({ blog }) => {
  return (
    <div>
        <h3>{blog.title}</h3>
        <p>Author: {blog.author}</p>
        <p>likes: {blog.likes}</p>
        <p>url: {blog.url}</p>
    </div>
  )
}

export default Blog;
