import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
	tasks: {},
	columns: {},
	columnsOrder: [],
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
		setKanban(state, action) {
			return (state = { ...state, ...action.payload })
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
	setKanban,
} = kanbanSlice.actions
export default kanbanSlice.reducer
