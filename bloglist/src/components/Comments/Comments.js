import React from "react";
import CommentForm from '../CommentForm'

const Comments = ({ comments }) => {
  return (
    <div>
      <h2>Comments</h2>
      <CommentForm />
      <ul>
        {comments && comments.map((comment, index) => {
          return (
            <li key={index}>{comment.comment}</li>
          )
        })}
      </ul>
    </div>
  )
}
export default Comments;
