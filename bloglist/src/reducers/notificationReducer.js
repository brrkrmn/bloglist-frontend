import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    type: 'success',
    message: '',
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            return action.payload
        },
        hideNotification: () => {
            return initialState
        },
    }
})

//content = ['message', 'type']
export const showNotification = (content) => {
    return async dispatch => {
        const newNotification = {
            message: content[0],
            type: content[1] || 'success',
        }
        dispatch(setNotification(newNotification))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 3000)
    }
}

export const { setNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer