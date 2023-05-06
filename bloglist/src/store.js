import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogsReducer from './reducers/blogsReducer'

const store = configureStore({
    reducer: {
        user: userReducer,
        blogs: blogsReducer,
        notification: notificationReducer,
    }
})

export default store