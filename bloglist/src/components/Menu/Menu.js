import React from "react";
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <div>
      <Link to='/blogs'>Blogs</Link>
      <Link to='/users'>Users</Link>
    </div>
  )
}

export default Menu;
