import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
	todoList: [],
	status: null,
	error: null,
}

export const fetchTodos = createAsyncThunk(
	'todos/fetchTodos',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(
				'https://todo-redux-toolkit-202cb-default-rtdb.firebaseio.com/todos.json',
			)
			if (response.ok) {
				const data = await response.json()
				const newData = []
				for (const key in data) {
					newData.push({
						text: data[key].text,
						completed: data[key].completed,
						id: data[key].id,
						key,
					})
				}

				return newData
			}
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

export const deleteTodoFromBase = createAsyncThunk(
	'todos/deleteTodoFromBase',
	async function (id, { rejectWithValue, dispatch }) {
		try {
			const response = await fetch(
				`https://todo-redux-toolkit-202cb-default-rtdb.firebaseio.com/todos/${id}.json`,
				{
					method: 'DELETE',
				},
			)
			if (!response.ok) {
				throw new Error('can not delete')
			}

			if (response.ok) {
				dispatch(deleteTodo(id))
			}
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

export const taskCompleted = createAsyncThunk(
	'todos/taskCompleted',
	async function (key, { rejectWithValue, dispatch, getState }) {
		const todo = getState().todos.todoList.find((todo) => todo.key === key)

		try {
			const response = await fetch(
				`https://todo-redux-toolkit-202cb-default-rtdb.firebaseio.com/todos/${key}.json`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						completed: !todo.completed,
					}),
				},
			)

			if (!response.ok) {
				throw new Error('can not toggle status')
			}

			if (response.ok) {
				dispatch(setCheck(key))
			}
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

export const addTodoToBase = createAsyncThunk(
	'todos/addTodoToBase',
	async function (obj, { rejectWithValue, dispatch }) {
		try {
			const response = await fetch(
				'https://todo-redux-toolkit-202cb-default-rtdb.firebaseio.com/todos.json',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(obj),
				},
			)
			if (!response.ok) {
				throw new Error('can not add')
			}
			const { name } = await response.json()
			dispatch(saveTodo({ ...obj, key: name }))
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

const TodoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		saveTodo: (state, action) => {
			state.todoList.push(action.payload)
		},
		setCheck: (state, action) => {
			const toggledTodo = state.todoList.find(
				(todo) => todo.key === action.payload,
			)
			toggledTodo.completed = !toggledTodo.completed
		},
		deleteTodo: (state, action) => {
			state.todoList = state.todoList.filter(
				(el) => el.key !== action.payload,
			)
		},
	},

	extraReducers: {
		[fetchTodos.pending]: (state) => {
			state.status = 'Loading'
			state.error = null
		},
		[fetchTodos.fulfilled]: (state, { payload }) => {
			state.status = 'Resolved'
			state.todoList = payload
		},
		[fetchTodos.rejected]: (state, { payload }) => {
			state.status = 'Rejected'
			state.error = payload
		},
		// [fetchTodos.rejected]: (state, { payload }) => {
		// 	state.status = 'Rejected'
		// 	state.error = payload
		// },
	},
})

export const { saveTodo, setCheck, deleteTodo } = TodoSlice.actions

export default TodoSlice.reducer
