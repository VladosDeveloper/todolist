import {FilterValues, Todolist} from "../../App.tsx";

type Actions = DeleteTodolistAction | CreateToDoListAction | ChangeTodolistTitleAction | changeFilterAction

type DeleteTodolistAction = ReturnType<typeof deleteToDoListAC>
type CreateToDoListAction = ReturnType<typeof createToDoListAC>
type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
type changeFilterAction = ReturnType<typeof changeFilterAC>

export const createToDoListAC = (payload: {id: string,title: string}) => {
		return {type: 'CREATE_TODOLIST', payload: payload} as const
}
export const deleteToDoListAC = (id: string) => {
		return {type: "DELETE_TODOLIST", payload: {id}} as const
		
}
export const changeTodolistTitleAC = (payload: { ToDoListId: string, newToDoListTitle: string }) => {
		return {type: 'CHANGE_TODOLIST_TITLE', payload: payload} as const
}
export const changeFilterAC = (payload: { ToDoListId: string, filter: FilterValues }) => {
		return {type: 'CHANGE_FILTER', payload: payload} as const
}


export const TodolistReducer = (state: Todolist[] , action: Actions): Todolist[] => {
		switch (action.type) {
				case 'DELETE_TODOLIST': {
						return state.filter(tdl => tdl.id !== action.payload.id)
				}
				case 'CREATE_TODOLIST': {
						const newTodoList: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
						return [...state, newTodoList]
				}
				case 'CHANGE_TODOLIST_TITLE': {
						return state.map(list => list.id === action.payload.ToDoListId ? {
								...list,
								title: action.payload.newToDoListTitle
						} : list)
				}
				case 'CHANGE_FILTER': {
						return state.map(list => list.id === action.payload.ToDoListId ? {
								...list,
								filter: action.payload.filter
						} : list)
				}
				default:
						return state
		}
}