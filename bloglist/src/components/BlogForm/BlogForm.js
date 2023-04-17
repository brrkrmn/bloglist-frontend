import React from 'react';
import blogService from '../../services/blogs'
import styles from './BlogForm.module.css'

const BlogForm = ({ setBlogs, blogs, setMessage }) => {
  const [title, setTitle] = React.useState('')
  const [author, setAuthor] = React.useState('')
  const [likes, setLikes] = React.useState('')
  const [url, setUrl] = React.useState('')

  const changeTitle = (event) => {
    setTitle(event.target.value)
  }
  const changeAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const changeLikes = (event) => {
    setLikes(event.target.value)
  }
  const changeUrl = (event) => {
    setUrl(event.target.value)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      likes: likes,
      url: url
    }
    const response = await blogService.create(newBlog)
    const newBlogs = [...blogs, response]
    setBlogs(newBlogs)

    setTitle('')
    setAuthor('')
    setLikes('')
    setUrl('')
    setMessage({
      type: 'success',
      message: `A new blog '${title}' by '${author}' is added`
    })
  }

  return (
    <>
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
          Likes:
          <input 
            type="number"
            value={likes}
            name="Likes"
            onChange={changeLikes}
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
    </>
  )
}

export default BlogForm;
