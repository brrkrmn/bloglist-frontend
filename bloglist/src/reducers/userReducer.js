import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs';

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        login: (state, action) => {
            return action.payload
        },
        logout: () => {
            return null
        }
    }
})

export const initializeUser = () => {
    return async dispatch => {
        const loggedUser = window.localStorage.getItem("loggedUser");
        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            dispatch(login(user))
            blogService.setToken(user.token)
        }
    }
}

export const removeUser = () => {
    return async dispatch => {
        dispatch(logout())
        window.localStorage.removeItem("loggedUser")
    }
}

export const { login, logout } = userSlice.actions
export default userSlice.reducer