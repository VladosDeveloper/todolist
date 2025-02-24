import {type ChangeEvent} from 'react'
import type {FilterValues, Task, Todolist} from './App'
import {CreateItemForm} from "./components/CreateItemForm.tsx";
import {EditableSpan} from "./components/EditableSpan.tsx";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button';
import List from "@mui/material/List";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import {containerSx, getIsDonValue} from "./styles/ToDoListItem.styles.ts";

type Props = {
	todolist: Todolist
	tasks: Task[]
	deleteTask: (todolistId: string, taskId: string) => void
	changeFilter: (todolistId: string, filter: FilterValues) => void
	createTask: (todolistId: string, title: string) => void
	changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
	deleteTodolist: (todolistId: string) => void
	changeTaskTitleText: (todolistId: string, taskId: string, title: string) => void
	changeToDoListTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = (props: Props) => {
	const {
		todolist: {id, title, filter},
		tasks,
		deleteTask,
		changeFilter,
		createTask,
		changeTaskStatus,
		deleteTodolist,
		changeTaskTitleText,
		changeToDoListTitle
	} = props
	
	const createTaskHandler = (title: string) => {
		createTask(id, title)
	}
	
	const changeFilterHandler = (filter: FilterValues) => {
		changeFilter(id, filter)
	}
	
	const deleteTodolistHandler = () => {
		deleteTodolist(id)
	}
	
	const changeToDoListTitleHandler = (title: string) => {
		changeToDoListTitle(id, title)
	}
	
	
	debugger
	return (
		<div>
			{/* Task header */}
			<div className={'container'}>
				<h3>
					<EditableSpan value={title} onChange={changeToDoListTitleHandler}/>
				</h3>
				<IconButton onClick={deleteTodolistHandler}>
					<DeleteIcon/>
				</IconButton>
			</div>
			
			{/* Create new task component */}
			<CreateItemForm onCreateItem={createTaskHandler}/>
			
			{/* Showing tasks  */}
			{tasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<List>
					{tasks.map(task => {
						const deleteTaskHandler = () => {
							deleteTask(id, task.id)
						}
						
						const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							const newStatusValue = e.currentTarget.checked
							changeTaskStatus(id, task.id, newStatusValue)
						}
						
						const onChangeTaskTitleHandler = (title: string) => {
							changeTaskTitleText(id, task.id, title)
						}
						
						return (
							<ListItem key={task.id} sx={getIsDonValue(task.isDone)}>
								<div>
									<Checkbox checked={task.isDone}
											  onChange={changeTaskStatusHandler}/>
									<EditableSpan value={task.title} onChange={onChangeTaskTitleHandler}/>
								</div>
								<IconButton onClick={deleteTaskHandler}>
									<DeleteIcon/>
								</IconButton>
							</ListItem>
						)
					})}
				</List>
			)}
			
			
			{/* Control buttons */}
			<Box sx={containerSx}>
				<Button variant={filter === 'all' ? 'outlined' : 'text'}
						onClick={() => changeFilterHandler('all')}>All</Button>
				<Button variant={filter === 'active' ? 'outlined' : 'text'}
						onClick={() => changeFilterHandler('active')}>Active</Button>
				<Button variant={filter === 'completed' ? 'outlined' : 'text'}
						onClick={() => changeFilterHandler('completed')}>Completed</Button>
			</Box>
		</div>
	)
}
