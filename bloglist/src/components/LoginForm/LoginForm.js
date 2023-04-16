import React from 'react';
import loginService from '../../services/login'

function LoginForm({ setUser }) {
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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (expection) {
      alert('Wrong credentials')
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} >
        <div>
          Username: 
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={changeUsername}
          />
        </div>
        <div>
          Password: 
          <input 
            type="password"
            value={password}
            name="Password"
            onChange={changePassword}
          />
        </div>
        <button type="submit" >Login</button>
      </form>
    </div>

  )
}

export default LoginForm;
