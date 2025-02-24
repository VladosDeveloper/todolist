import {beforeEach, expect, test} from "vitest";
import {v1} from "uuid";
import {FilterValues, Todolist} from "../../App.tsx";
import {
		changeFilterAC,
		changeTodolistTitleAC,
		createToDoListAC,
		deleteToDoListAC,
		TodolistReducer
} from "./todolist-reducer.ts";

let todolistID1: string
let todolistID2: string
let initState: Todolist[]

beforeEach(() => {
		 todolistID1 = v1()
		 todolistID2 = v1()
		 initState = [
				{id: todolistID1, title: 'What to buy', filter: 'all'},
				{id: todolistID2, title: 'What to sell', filter: 'all'}
		]
})

test('should delete correct todolist', () => {
		//actions
		const endState = TodolistReducer(initState, deleteToDoListAC(todolistID2))
		
		//expectations
		expect(endState.length).toBe(1)
		expect(endState[0].id).toBe(todolistID1)
})

test('should create new todolist', () => {
		const newTitle = 'new todolist'
		
		//actions
		const endState = TodolistReducer(initState, createToDoListAC({id: '4', title: newTitle}))
		
		//expectations
		expect(endState.length).toBe(3)
		expect(endState[2].title).toBe(newTitle)
})

test('should change  todolist title', () => {
		const newTitle = 'changed name'
		
		//actions
		const endState = TodolistReducer(initState, changeTodolistTitleAC({ToDoListId: todolistID1, newToDoListTitle: newTitle}))
		
		//expectations
		expect(endState.length).toBe(2)
		expect(endState[0].title).toBe(newTitle)
})

test('should change  its filter', () => {
		const filter: FilterValues = 'completed'
		
		//actions
		const endState = TodolistReducer(initState, changeFilterAC({ToDoListId: todolistID2, filter}))
		
		//expectations
		expect(endState.length).toBe(2)
		expect(endState[1].filter).toBe(filter)
})

