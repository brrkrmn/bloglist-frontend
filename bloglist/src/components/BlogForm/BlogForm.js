import React from 'react';
import blogService from '../../services/blogs'
import styles from './BlogForm.module.css'
import Togglable from '../Togglable/Togglable';

const BlogForm = ({ user, onCreate }) => {
  const [title, setTitle] = React.useState('')
  const [author, setAuthor] = React.useState('')
  const [url, setUrl] = React.useState('')

  const changeTitle = (event) => {
    setTitle(event.target.value)
  }
  const changeAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const changeUrl = (event) => {
    setUrl(event.target.value)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    
    const response = await blogService.create(newBlog)
    onCreate(response)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel='Add Blog' cancelButtonLabel='Cancel'>
      <form onSubmit={handleAddBlog} className={styles.formWrapper}>
        <div>
          Title:
          <input 
            type="text"
            value={title}
            name="Title"
            onChange={changeTitle}
          />
        </div>
        <div>
          Author: 
          <input 
            type="text"
            value={author}
            name="Author"
            onChange={changeAuthor}
          />
        </div>
        <div>
          URL:
          <input 
            type="text"
            value={url}
            name="Url"
            onChange={changeUrl}
          />
        </div>
        <button type='submit'>Add</button>
    </form>
    </Togglable>
  )
}

export default BlogForm;
