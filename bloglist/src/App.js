import React from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm/LoginForm'
import Blogs from './components/Blogs'

const App = () => {
  const [blogs, setBlogs] = React.useState([])
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
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

  return (
    <div>
      {user === null
        ? <LoginForm setUser={setUser} />
        : <Blogs blogs={blogs} user={user} handleLogout={handleLogout} />
      }
    </div>
  )
}

export default App