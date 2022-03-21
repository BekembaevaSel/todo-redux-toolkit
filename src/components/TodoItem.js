import { Checkbox } from '@mui/material'
import React from 'react'
import './TodoItem.css'
import { useDispatch } from 'react-redux'
import { setCheck } from '../store/TodoSlice'
import { taskCompleted } from '../store/TodoSlice'
import { deleteTodoFromBase } from '../store/TodoSlice'

const TodoItem = ({ text, completed, id }) => {
	const dispatch = useDispatch()

	const handleCheck = () => {
		dispatch(taskCompleted(id))
	}

	const deleteHandler = () => {
		dispatch(deleteTodoFromBase(id))
	}

	return (
		<div className='todoItem'>
			<Checkbox
				checked={completed}
				color='primary'
				onChange={handleCheck}
				inputProps={{ 'aria-label': 'secondary checkbox' }}
			/>

			<p>{text}</p>
			<img
				onClick={deleteHandler}
				src='https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/000000/external-delete-ui-dreamstale-lineal-dreamstale-2.png'
			/>
		</div>
	)
}

export default TodoItem
