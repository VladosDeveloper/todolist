import {beforeEach, expect, test} from "vitest";
import {TasksState} from "../../App.tsx";
import {
		changeTaskStatusAC, changeTaskTitleAC,
		createTaskAC, createToDoListAct,
		deleteTaskAC,
		deleteToDoListAct,
		tasksReducer
} from "./toDoListTasks-reducer.ts";

let initState: TasksState = {}

beforeEach(() => {
		initState = {
				todolistId1: [
						{id: '1', title: 'HTML&CSS', isDone: true},
						{id: '2', title: 'JS', isDone: true},
						{id: '3', title: 'ReactJS', isDone: false},
				],
				todolistId2: [
						{id: '1', title: 'Rest API', isDone: true},
						{id: '2', title: 'GraphQL', isDone: false},
				],
		}
})

test("tasks should be created for todolist", () => {
		const endState = tasksReducer(initState, createToDoListAct('New todolist'))
		
		// Achieve all keys from
		const keys = Object.keys(endState)
		// вернет строку
		const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
		if (!newKey) {
				throw new Error('New key should be added')
		}
		
		expect(keys.length).toBe(3)
		expect(endState[newKey].length).toBe(0)
})

test("tasks should be created for todolist", () => {
		const endState = tasksReducer(initState, deleteToDoListAct('todolistId2'))
		
		const keys = Object.keys(endState)
		
		expect(keys.length).toBe(1)
		expect(endState['todolistId2']).not.toBeDefined()
		expect(endState['todolistId2']).toBeUndefined()
})

test('correct task should be deleted', () => {
		const endState = tasksReducer(
				initState,
				deleteTaskAC({todolistId: 'todolistId1', taskId: '2'})
		)
		
		expect(endState).toEqual({
				todolistId1: [
						{id: '1', title: 'HTML&CSS', isDone: true},
						{id: '3', title: 'ReactJS', isDone: false},
				],
				todolistId2: [
						{id: '1', title: 'Rest API', isDone: true},
						{id: '2', title: 'GraphQL', isDone: false},
				],
		})
})

test("tasks should be created", () => {
		const endState = tasksReducer(initState, createTaskAC({todolistId: 'todolistId1', title: 'new task created'}))
		
		expect(endState.todolistId1.length).toBe(4)
		expect(endState.todolistId2.length).toBe(2)
		expect(endState.todolistId1[0].id).toBeDefined()
		expect(endState.todolistId1[0].title).toBe('new task created')
		expect(endState.todolistId1[0].isDone).toBe(false)
		
})

test("tasks should be created", () => {
		const endState = tasksReducer(initState, changeTaskStatusAC({
				todolistId: 'todolistId2',
				taskId: '1',
				isDone: false
		}))
		
		expect(endState.todolistId1[2].isDone).toBe(false)
		expect(endState.todolistId2[0].isDone).toBe(false)
})

test('task title should be changed', () => {
		const endState = tasksReducer(
				initState,
				changeTaskTitleAC({ToDoListId: 'todolistId2', taskId: '2', newTaskText: 'Im changed'})
		)
		
		expect(endState.todolistId2[1].title).toBe('Im changed')
		expect(endState.todolistId2[0].title).toBe('Rest API')
})