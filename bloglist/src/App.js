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
        }
        initialBlogs.push(newBlog)
        return(initialBlogs)
        })
      setBlogs(initialBlogs)
    }
    getAllBlogs()
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
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
        : <Blogs blogs={blogs} user={user} handleLogout={handleLogout} setBlogs={setBlogs} setMessage={setMessage} />
      }
    </div>
  )
}

export default App