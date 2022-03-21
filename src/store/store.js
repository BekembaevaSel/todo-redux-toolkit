import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './TodoSlice'

export default configureStore({
	reducer: {
		todos: todoReducer,
	},
})
