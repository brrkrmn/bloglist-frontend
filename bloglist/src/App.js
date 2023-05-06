import React from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification/Notification";

import { useDispatch, useSelector } from "react-redux";
import { initializeUser } from './reducers/userReducer';
import { initializeBlogs } from "./reducers/blogsReducer";

const App = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(initializeUser())
  }, []);
  const user = useSelector(state => state.user)

  React.useEffect(() => {
    dispatch(initializeBlogs())
  }, []);

  return (
    <div>
      <Notification />
      {user === null ? (<LoginForm />) : (<Blogs/>)}
    </div>
  );
};

export default App;
