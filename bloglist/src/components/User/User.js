import React from "react";

function User({ user }) {
  if (!user) {
    return null
  }
  return (
    <>
      <h1>{user.username}</h1>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map(blog => {
          return (
            <li key={blog.id}>{blog.title}</li>
          )
        })}
      </ul>
    </>

  )
}

export default User;
