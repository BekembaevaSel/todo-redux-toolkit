import React, { useState } from 'react'
import s from './Input.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addTodoToBase } from '../store/TodoSlice'

const Input = () => {
	const dispatch = useDispatch()

	const [input, setInput] = useState('')
	const { status, error } = useSelector((state) => state.todos)

	const addTodoHandler = () => {
		if (input.trim().length > 0) {
			dispatch(
				addTodoToBase({
					text: input,
					completed: false,
					id: Date.now(),
				}),
			)
			setInput('')
		}
	}
	const enterAddHandler = (e) => {
		if (e.code === 'Enter') {
			addTodoHandler()
		}
	}
	return (
		<div className={s.input}>
			{status === 'Loading' && <h2>Loading...</h2>}
			{error && <h2>an error occured: {error}</h2>}
			<input
				type='text'
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={enterAddHandler}
			/>
			<button onClick={addTodoHandler}>Add</button>
		</div>
	)
}

export default Input
