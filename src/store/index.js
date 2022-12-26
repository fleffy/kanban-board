import { configureStore } from '@reduxjs/toolkit'
import kanbanSlice from './kanbanSlice'

export const store = configureStore({
	reducer: {
		kanban: kanbanSlice,
	},
})
