import React from "react";
import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { commentBlog } from "../../reducers/blogsReducer";

const CommentForm = () => {
  const [comment, setComment] = React.useState('')
  const dispatch = useDispatch()
  const id = useParams().id

  const onCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(id, comment))
    setComment('')
  }

  return (
    <form onSubmit={addComment}>
        <input
          id="comment"
          type="text"
          value={comment}
          name="Comment"
          onChange={onCommentChange}
        />
        <button type="submit">Add Comment</button>
    </form>
  )
}

export default CommentForm;
