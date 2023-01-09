import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
	tasks: {
		'task-1': { id: 'task-1', content: 'Do something', time: 'Date1' },
		'task-2': { id: 'task-2', content: 'Chill', time: 'Date2' },
	},

	columns: {
		'column-1': {
			id: 'column-1',
			title: 'Todo',
			tasksOrder: ['task-1', 'task-2'],
		},
		'column-2': {
			id: 'column-2',
			title: 'In process',
			tasksOrder: ['task-1', 'task-2'],
		},
		'column-3': {
			id: 'column-3',
			title: 'Done',
			tasksOrder: ['task-1', 'task-2'],
		},
	},

	columnsOrder: ['column-1', 'column-2', 'column-3'],
}

export const kanbanSlice = createSlice({
	name: 'kanban',
	initialState,
	reducers: {
		addColumn(state, action) {
			const id = 'columnID-' + uuidv4()

			state.columns[id] = {
				id,
				title: action.payload,
				tasksOrder: [],
			}

			state.columnsOrder.push(id)
		},
		removeColumn(state, action) {
			const indexOfColumn = state.columnsOrder.indexOf(action.payload)

			state.columnsOrder.splice(indexOfColumn, 1)

			delete state.columns[action.payload]
		},
		addTask(state, action) {
			const id = uuidv4()

			state.tasks[id] = {
				id,
				content: action.payload.content,
				time: new Date().toLocaleString(),
			}

			state.columns[action.payload.columnId].tasksOrder.push(id)
		},
		removeTask(state, action) {
			const indexOfTask = state.columns[
				action.payload.columnId
			].tasksOrder.indexOf(action.payload.taskId)

			state.columns[action.payload.columnId].tasksOrder.splice(indexOfTask, 1)

			delete state.tasks[action.payload.taskId]
		},
		editColumnTitle(state, action) {
			state.columns[action.payload.columnId].title = action.payload.newTitle
		},
		editTaskTitle(state, action) {
			state.tasks[action.payload.taskId].content = action.payload.newContent
		},
	},
})

export const {
	addColumn,
	removeColumn,
	addTask,
	removeTask,
	editColumnTitle,
	editTaskTitle,
} = kanbanSlice.actions
export default kanbanSlice.reducer
