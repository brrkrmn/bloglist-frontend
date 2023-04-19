import React from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm/LoginForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification/Notification'

const App = () => {
  const [blogs, setBlogs] = React.useState([])
  const [user, setUser] = React.useState(null)
  const [notification, setNotification] = React.useState(null)

  React.useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  React.useEffect(() => {
    getAllBlogs()
  }, [])
  
  const getAllBlogs = async () => {
    const response = await blogService.getAll()
    let initialBlogs = []
    response.map(blog => {
      const newBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
        url: blog.url,
        id: blog.id,
        user: blog.user,
      }
      initialBlogs.push(newBlog)
      initialBlogs.sort((a, b) => b.likes - a.likes)
      return(initialBlogs)
      })
    setBlogs(initialBlogs)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const onCreate = (newBlog) => {
    const updatedBlogs = [...blogs, newBlog]
    updatedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
    getAllBlogs()
    setMessage({
      type: 'success',
      message: `New blog ${newBlog.title} by ${newBlog.author} is added`
    })
  }

  const onLike = (newBlog) => {
    const updatedBlogs = blogs.map(blog => {
      if (blog.id === newBlog.id) {
        return {
          ...blog,
          likes: newBlog.likes
        }
      } else {
        return blog
      }
    })
    updatedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
    setMessage({
      type: 'success',
      message: `${newBlog.title} is liked`
    })
  }

  const onDelete = (id) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id)
    setBlogs(updatedBlogs)
    setMessage({
      type: 'success',
      message: 'Blog deleted'
    })
  }

  const setMessage = (newMessage) => {
    setNotification(newMessage)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  return (
    <div>
      <Notification notification={notification} />
      {user === null
        ? <LoginForm setUser={setUser} setMessage={setMessage} />
        : <Blogs blogs={blogs} user={user} handleLogout={handleLogout} setBlogs={setBlogs} setMessage={setMessage} onCreate={onCreate} onLike={onLike} onDelete={onDelete} />
      }
    </div>
  )
}

export default App