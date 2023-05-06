import React from "react";
import Togglable from "../Togglable/Togglable";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog } from "../../reducers/blogsReducer";
import { showNotification } from "../../reducers/notificationReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user  )
  // const handleLike = async () => {
  //   const newBlog = {
  //     title: blog.title,
  //     author: blog.author,
  //     likes: blog.likes + 1,
  //     url: blog.url,
  //     user: blog.user,
  //   };
  //   const response = await blogService.update(blog.id, newBlog);
  //   onLike(response);
  // };

  const handleRemove = async () => {
    dispatch(deleteBlog(blog.id))
    dispatch(showNotification(['Blog deleted']))
  };

  return (
    <div className="blog">
      <h3>{blog.title}</h3>
      <Togglable buttonLabel="View" cancelButtonLabel="Hide">
        <p>Author: {blog.author}</p>
        <p>
          likes: {blog.likes}
          <button id="like"
          // onClick={handleLike}
          >
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
