import './App.css'
import {useReducer, useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'
import {CreateItemForm} from "./components/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import {containerSx} from "./styles/ToDoListItem.styles.ts";
import MenuIcon from '@mui/icons-material/Menu';
import {NavButton} from './styles/NavBarButtons.ts';
import createTheme from '@mui/material/styles/createTheme';
import {ThemeProvider} from "@mui/material/styles";
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
		changeFilterAC,
		changeTodolistTitleAC,
		createToDoListAC,
		deleteToDoListAC,
		TodolistReducer
} from "./model/toDoListReducer/todolist-reducer.ts";
import {
		changeTaskStatusAC,
		changeTaskTitleAC,
		createTaskAC, createToDoListAct,
		deleteTaskAC,
		deleteToDoListAct,
		tasksReducer
} from "./model/toDoListTasksReducer/toDoListTasks-reducer.ts";

export type Todolist = {
		id: string
		title: string
		filter: FilterValues
}

export type Task = {
		id: string
		title: string
		isDone: boolean
}


export type FilterValues = 'all' | 'active' | 'completed'
type ThemeMode = 'dark' | 'light'

export type TasksState = Record<string, Task[]>

export const App = () => {
		const todolistId1 = v1()
		const todolistId2 = v1()
		
		const [switchTheme, setSwitchTheme] = useState<ThemeMode>('light')
		
		const theme = createTheme({
				palette: {
						mode: switchTheme,
						primary: {
								main: '#087EA4',
						}
				}
		})
		
		const [todolists, dispatchToTodolists] = useReducer(TodolistReducer, [
				{id: todolistId1, title: 'What to buy', filter: 'all'},
				{id: todolistId2, title: 'What to sell', filter: 'all'}
		])
		
		const [tasks, dispatchToTasks] = useReducer(tasksReducer,
				{
						[todolistId1]: [
								{id: v1(), title: 'HTML&CSS', isDone: true},
								{id: v1(), title: 'JS', isDone: true},
								{id: v1(), title: 'ReactJS', isDone: false},
						],
						[todolistId2]: [
								{id: v1(), title: 'Rest API', isDone: true},
								{id: v1(), title: 'GraphQL', isDone: false},
						],
				}
		)
		
		const changeFilter = (todolistId: string, filter: FilterValues) => {
				dispatchToTodolists(changeFilterAC({ToDoListId: todolistId, filter}))
		}
		
		const deleteTodolist = (todolistId: string) => {
				dispatchToTodolists(deleteToDoListAC(todolistId))
				dispatchToTasks(deleteToDoListAct(todolistId))
		}
		
		const deleteTask = (todolistId: string, taskId: string) => {
				dispatchToTasks(deleteTaskAC({todolistId, taskId}))
		}
		
		const createTask = (todolistId: string, title: string) => {
				dispatchToTasks(createTaskAC({todolistId, title}))
		}
		
		const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
				dispatchToTasks(changeTaskStatusAC({todolistId, taskId, isDone}))
		}
		
		const createNewToDoList = (title: string) => {
				const toDoListId = v1()
				dispatchToTodolists(createToDoListAC({id: toDoListId, title}))
				dispatchToTasks(createToDoListAct(toDoListId))
		}
		
		const changeTaskTitleText = (ToDoListId: string, taskId: string, newTaskText: string) => {
				dispatchToTasks(changeTaskTitleAC({ToDoListId, taskId, newTaskText}))
		}
		
		const changeToDoListTitle = (ToDoListId: string, newToDoListTitle: string) => {
				dispatchToTodolists(changeTodolistTitleAC({ToDoListId: ToDoListId, newToDoListTitle}))
		}
		
		const changeMode = () => {
				setSwitchTheme(prev => prev === 'light' ? 'dark' : 'light')
		}
		
		return (
				<ThemeProvider theme={theme}>
						<CssBaseline/>
						<div className="app">
								<AppBar position="static" sx={{mb: '30px'}}>
										<Toolbar variant="dense">
												<Container maxWidth="lg" sx={containerSx}>
														<IconButton color="inherit">
																<MenuIcon/>
														</IconButton>
														<div>
																<NavButton color="inherit">Sign in</NavButton>
																<NavButton color="inherit">Sign up</NavButton>
																<NavButton color="inherit" background={theme.palette.primary.dark}>FAQ</NavButton>
																<Switch color={'default'} onClick={changeMode}/>
														</div>
												</Container>
										</Toolbar>
								</AppBar>
								<Container maxWidth="lg" fixed>
										<Grid container sx={{mb: '30px'}}>
												<CreateItemForm onCreateItem={createNewToDoList}/>
										</Grid>
										
										<Grid container spacing={4}>
												{todolists.map(todolist => {
														const todolistTasks = tasks[todolist.id]
														let filteredTasks = todolistTasks
														if (todolist.filter === 'active') {
																filteredTasks = todolistTasks.filter(task => !task.isDone)
														}
														if (todolist.filter === 'completed') {
																filteredTasks = todolistTasks.filter(task => task.isDone)
														}
														
														return (
																<Grid key={todolist.id}>
																		<Paper elevation={3} sx={{p: '0 20px 20px'}}>
																				<TodolistItem
																						todolist={todolist}
																						tasks={filteredTasks}
																						deleteTask={deleteTask}
																						changeFilter={changeFilter}
																						createTask={createTask}
																						changeTaskStatus={changeTaskStatus}
																						deleteTodolist={deleteTodolist}
																						changeTaskTitleText={changeTaskTitleText}
																						changeToDoListTitle={changeToDoListTitle}
																				/>
																		</Paper>
																</Grid>
														)
												})}
										</Grid>
								</Container>
						</div>
				</ThemeProvider>
		)
}
