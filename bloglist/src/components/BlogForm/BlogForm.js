import React from "react";
import styles from "./BlogForm.module.css";
import Togglable from "../Togglable/Togglable";

import { useDispatch } from "react-redux";
import { createBlog } from "../../reducers/blogsReducer";
import { showNotification } from "../../reducers/notificationReducer";

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [url, setUrl] = React.useState("");

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };
  const changeAuthor = (event) => {
    setAuthor(event.target.value);
  };
  const changeUrl = (event) => {
    setUrl(event.target.value);
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    dispatch(createBlog(newBlog));
    dispatch(showNotification([`New blog ${newBlog.title} by ${newBlog.author} is added`]))

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <Togglable buttonLabel="Add Blog" cancelButtonLabel="Cancel">
      <form onSubmit={handleAddBlog} className={styles.formWrapper}>
        <div>
          Title:
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={changeTitle}
            placeholder="title"
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={changeAuthor}
            placeholder="author"
          />
        </div>
        <div>
          URL:
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={changeUrl}
            placeholder="url"
          />
        </div>
        <button id="blogButton" type="submit">
          Add
        </button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
