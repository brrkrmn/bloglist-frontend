import React from 'react'
import loginService from '../../services/login'
import blogService from '../../services/blogs'

function LoginForm({ setUser, setMessage }) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const changeUsername = (event) => {
    setUsername(event.target.value)
  }

  const changePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (expection) {
      setMessage({
        type: 'fail',
        message: 'Invalid Username or Password'
      })
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} >
        <div>
          Username:
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={changeUsername}
          />
        </div>
        <div>
          Password:
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={changePassword}
          />
        </div>
        <button id='loginButton' type="submit" >Login</button>
      </form>
    </div>

  )
}

export default LoginForm
