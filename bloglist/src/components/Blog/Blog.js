import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, likeBlog } from "../../reducers/blogsReducer";
import { showNotification } from "../../reducers/notificationReducer";
import Comments from '../Comments'
import { useNavigate } from "react-router-dom";

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  if (!blog) {
    return null
  }
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLike = async () => {
    dispatch(likeBlog(blog.id));
    dispatch(showNotification([`${blog.title} is liked`]))
  };

  const handleRemove = async () => {
    dispatch(deleteBlog(blog.id))
    dispatch(showNotification(['Blog deleted']))
    navigate('/blogs')
  };

  return (
    <div className="blog">
      <h3>{blog.title}</h3>
        <p>Author: {blog.author}</p>
        <p>
          likes: {blog.likes}
          <button id="like" onClick={handleLike}>
            Like
          </button>
        </p>
        <p>url: {blog.url}</p>
        <p>Added by {blog.user.username}</p>
        {blog.user.username === user.username && (
          <button onClick={handleRemove}>Delete Blog</button>
        )}
        <Comments comments={blog.comments} />
    </div>
  );
};

export default Blog;
