import React from "react";
import Togglable from "../Togglable/Togglable";
import blogService from "../../services/blogs";
import { useSelector } from "react-redux";

const Blog = ({ blog, onLike, onDelete }) => {
  const user = useSelector(state => state.user  )
  const handleLike = async () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user,
    };
    const response = await blogService.update(blog.id, newBlog);
    onLike(response);
  };

  const handleRemove = async () => {
    await blogService.remove(blog.id);
    onDelete(blog.id);
  };

  return (
    <div className="blog">
      <h3>{blog.title}</h3>
      <Togglable buttonLabel="View" cancelButtonLabel="Hide">
        <p>Author: {blog.author}</p>
        <p>
          likes: {blog.likes}
          <button id="like" onClick={handleLike}>
            Like
          </button>
        </p>
        <p>url: {blog.url}</p>
        <p>{blog.user.username}</p>
        {blog.user.username === user.username && (
          <button onClick={handleRemove}>Delete Blog</button>
        )}
      </Togglable>
    </div>
  );
};

export default Blog;
