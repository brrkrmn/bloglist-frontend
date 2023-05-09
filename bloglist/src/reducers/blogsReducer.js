import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs';

const initialState = []

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            return action.payload
        },
        sortBlogs: (state) => {
            return state.sort((a, b) => b.likes - a.likes)
        },
        appendBlog: (state, action) => {
            state.push(action.payload)
        },
        updateBlog: (state, action) => {
            const id = action.payload.id
            return state.map(blog => blog.id !== id ? blog : action.payload)
        },
        removeBlog: (state, action) => {
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        }
    }
})

export const initializeBlogs = () => {
    return async dispatch => {
        const initialBlogs = []
        const response = await blogService.getAll()
        response.map(blog => {
            const blogObject = {
                title: blog.title,
                author: blog.author,
                likes: blog.likes,
                url: blog.url,
                id: blog.id,
                user: blog.user,
                comments: blog.comments,
            };
            initialBlogs.push(blogObject)
        })
        initialBlogs.sort((a, b) => b.likes - a.likes);
        dispatch(setBlogs(initialBlogs))
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch(appendBlog(newBlog))
        dispatch(initializeBlogs())
    }
}

export const likeBlog = (id) => {
    return async dispatch => {
        const updatedBlog = await blogService.likeBlog(id)
        dispatch(updateBlog(updatedBlog))
        dispatch(initializeBlogs())
    }
}

export const commentBlog = (id, content) => {
    return async dispatch => {
        const comment = { comment: content }
        const updatedBlog = await blogService.commentBlog(id, comment)
        dispatch(updateBlog(updatedBlog))
        dispatch(initializeBlogs())
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id);
        dispatch(removeBlog(id))
    }
}

export const { setBlogs, sortBlogs, appendBlog, updateBlog, removeBlog } = blogsSlice.actions
export default blogsSlice.reducer