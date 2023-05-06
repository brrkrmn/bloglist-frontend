import React from "react";
import loginService from "../../services/login";
import blogService from "../../services/blogs";
import { useDispatch } from "react-redux";
import { showNotification } from '../../reducers/notificationReducer';
import { login } from "../../reducers/userReducer";

function LoginForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch()

  const changeUsername = (event) => {
    setUsername(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);

      dispatch(login(user))
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(showNotification(['Invalid Username or Password', 'fail']))
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Username:
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={changeUsername}
          />
        </div>
        <div>
          Password:
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={changePassword}
          />
        </div>
        <button id="loginButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
