import './App.css'
import Input from './components/Input'
import TodoItem from './components/TodoItem'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTodos } from './store/TodoSlice'

function App() {
	const dispatch = useDispatch()
	const todoList = useSelector((state) => state.todos.todoList)


	useEffect(() => {
		dispatch(fetchTodos())
	}, [])

	return (
		<div className='App'>
			<div className='app_wrapper'>
				<div className='app_todocontainer'>
					{todoList.map((item) => (
						<TodoItem
							text={item.text}
							completed={item.completed}
							id={item.key}
							key={Math.random().toString()}
						/>
					))}
				</div>
				<Input />
			</div>
		</div>
	)
}

export default App
