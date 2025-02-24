import {TasksState} from "../../App.tsx";
import {v1} from "uuid";

type createToDoListAction = ReturnType<typeof createToDoListAct>
type deleteToDoListAction = ReturnType<typeof deleteToDoListAct>
type deleteTaskAction = ReturnType<typeof deleteTaskAC>
type createTaskAction = ReturnType<typeof createTaskAC>
type changeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

export const createToDoListAct = (id: string) => {
		return {type: 'CREATE_TODOLIST', payload: {id}} as const
}
export const deleteToDoListAct = (id: string) => {
		return {type: 'DELETE_TODOLIST', payload: {id}} as const
}

export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => {
		return {type: 'DELETE_TASK', payload} as const
}
export const createTaskAC = (payload: { todolistId: string, title: string }) => {
		return {type: 'CREATE_TASK', payload} as const
}
export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
		return {type: 'CHANGE_TASK_STATUS', payload} as const
}
export const changeTaskTitleAC = (payload: { ToDoListId: string, taskId: string, newTaskText: string }) => {
		return {type: 'CHANGE_TASK_TITLE', payload} as const
}


export const tasksReducer = (state: TasksState, action: Actions):TasksState => {
		switch (action.type) {
				case 'CREATE_TODOLIST': {
						return {...state, [action.payload.id]: []}
				}
				case 'DELETE_TODOLIST': {
						const newSate = {...state}
						delete newSate[action.payload.id]
						return newSate
				}
				case 'DELETE_TASK': {
						return {
								...state,
								[action.payload.todolistId]: state[action.payload.todolistId].filter(i => i.id !== action.payload.taskId)
						}
				}
				case 'CREATE_TASK': {
						const newTask = {id: v1(), title: action.payload.title, isDone: false}
						return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
				}
				case 'CHANGE_TASK_STATUS': {
						return {
								...state,
								[action.payload.todolistId]: state[action.payload.todolistId]
										.map(i => i.id === action.payload.taskId ? {...i, isDone: action.payload.isDone} : i)
						}
				}
				case 'CHANGE_TASK_TITLE': {
						const task = state[action.payload.ToDoListId].find(el => el.id === action.payload.taskId)
						if (task) {
								task.title = action.payload.newTaskText
						}
						return {
								...state,
								[action.payload.ToDoListId]: [...state[action.payload.ToDoListId]]
						}
				}
				default: {
						return state
				}
		}
}

type Actions =
		createToDoListAction
		| deleteToDoListAction
		| deleteTaskAction
		| createTaskAction
		| changeTaskStatusAction
		| changeTaskTitleAction