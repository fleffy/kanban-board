import { createSlice } from '@reduxjs/toolkit'

const getInitialKanbanData = () => {
	const localKanban = window.localStorage.getItem('localKanban')
	if (localKanban) {
		return JSON.parse(localKanban)
	}
	window.localStorage.setItem('localKanban', JSON.stringify([]))
	return []
}

const initialState = {
	kanbanData: getInitialKanbanData(),
}

export const kanbanSlice = createSlice({
	name: 'kanban',
	initialState,
	reducers: {
		setKanban(state, action) {
			return (state = { ...state, ...action.payload })
		},
		addColumn(state, action) {
			state.kanbanData.push(action.payload)

			const kanbanData = window.localStorage.getItem('localKanban')

			if (kanbanData) {
				const kanbanDataArr = JSON.parse(kanbanData)
				kanbanDataArr.push({
					...action.payload,
				})
				window.localStorage.setItem(
					'localKanban',
					JSON.stringify(kanbanDataArr)
				)
			} else {
				window.localStorage.setItem(
					'localKanban',
					JSON.stringify([{ ...action.payload }])
				)
			}
		},
		removeColumn(state, action) {
			const kanbanData = window.localStorage.getItem('localKanban')
			const kanbanDataArr = JSON.parse(kanbanData)

			kanbanDataArr.forEach((kanban, index) => {
				if (kanban.id === action.payload) {
					kanbanDataArr.splice(index, 1)
				}
			})

			window.localStorage.setItem('localKanban', JSON.stringify(kanbanDataArr))
			state.kanbanData = kanbanDataArr
		},
		addTask(state, action) {
			const kanbanData = window.localStorage.getItem('localKanban')
			const kanbanDataArr = JSON.parse(kanbanData)

			kanbanDataArr.forEach((kanban) => {
				if (kanban.id === action.payload.id) {
					kanban.tasks.push(action.payload.newTask)
				}
			})

			window.localStorage.setItem('localKanban', JSON.stringify(kanbanDataArr))
			state.kanbanData = kanbanDataArr
		},
		removeTask(state, action) {
			const kanbanData = window.localStorage.getItem('localKanban')
			const kanbanDataArr = JSON.parse(kanbanData)

			kanbanDataArr.forEach((kanban) => {
				if (kanban.id === action.payload.kanbanID) {
					kanban.tasks.map((task, index) => {
						if (task.taskID === action.payload.taskID) {
							kanban.tasks.splice(index, 1)
						}
					})
				}
			})

			window.localStorage.setItem('localKanban', JSON.stringify(kanbanDataArr))
			state.kanbanData = kanbanDataArr
		},
		editColumnTitle(state, action) {
			const kanbanData = window.localStorage.getItem('localKanban')
			const kanbanDataArr = JSON.parse(kanbanData)

			kanbanDataArr.forEach((kanban) => {
				if (kanban.id === action.payload.id) {
					kanban.title = action.payload.newTitle
				}
			})

			window.localStorage.setItem('localKanban', JSON.stringify(kanbanDataArr))
			state.kanbanData = kanbanDataArr
		},
		editTaskTitle(state, action) {
			const kanbanData = window.localStorage.getItem('localKanban')
			const kanbanDataArr = JSON.parse(kanbanData)

			kanbanDataArr.forEach((kanban) => {
				if (kanban.id === action.payload.kanbanID) {
					kanban.tasks.map((task) => {
						if (task.taskID === action.payload.taskID) {
							task.taskText = action.payload.editedTaskText
						}
					})
				}
			})

			window.localStorage.setItem('localKanban', JSON.stringify(kanbanDataArr))
			state.kanbanData = kanbanDataArr
		},
	},
})

export const {
	setKanban,
	addColumn,
	removeColumn,
	addTask,
	removeTask,
	editColumnTitle,
	editTaskTitle,
} = kanbanSlice.actions
export default kanbanSlice.reducer
