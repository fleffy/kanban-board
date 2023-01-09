import { AddColumn } from './Column/AddColumn'
import { Columns } from './Column/Columns'

import { setKanban } from '../../store/kanbanSlice'

import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext } from '@hello-pangea/dnd'

export const Kanban = () => {
	const kanbanData = useSelector((state) => state.kanbanApp)
	const dispatch = useDispatch()

	const setInitialData = (state) => {
		dispatch(setKanban(state))
	}

	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result

		if (!destination) {
			return
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return
		}

		const startColumn = kanbanData.columns[source.droppableId]
		const finishColumn = kanbanData.columns[destination.droppableId]

		if (startColumn === finishColumn) {
			const newTasksOrder = Array.from(startColumn.tasksOrder)
			newTasksOrder.splice(source.index, 1)
			newTasksOrder.splice(destination.index, 0, draggableId)

			const newColumn = {
				...startColumn,
				tasksOrder: newTasksOrder,
			}

			const newState = {
				...kanbanData,
				columns: {
					...kanbanData.columns,
					[newColumn.id]: newColumn,
				},
			}

			setInitialData(newState)
			return
		}

		const startTasksOrder = Array.from(startColumn.tasksOrder)
		startTasksOrder.splice(source.index, 1)

		const newStartColumn = {
			...startColumn,
			tasksOrder: startTasksOrder,
		}

		const finishTasksOrder = Array.from(finishColumn.tasksOrder)
		finishTasksOrder.splice(destination.index, 0, draggableId)

		const newFinishColumn = {
			...finishColumn,
			tasksOrder: finishTasksOrder,
		}

		const newState = {
			...kanbanData,
			columns: {
				...kanbanData.columns,
				[newStartColumn.id]: newStartColumn,
				[newFinishColumn.id]: newFinishColumn,
			},
		}

		setInitialData(newState)
		return
	}

	return (
		<div className='p-6 px-[1.5rem] xl:px-[7.5rem] mt-[50px]'>
			<AddColumn />
			<DragDropContext onDragEnd={onDragEnd}>
				<div className='flex overflow-auto gap-5 pb-3 items-start'>
					{kanbanData.columnsOrder.map((columnId) => {
						const column = kanbanData.columns[columnId]
						const tasks = column.tasksOrder.map(
							(taskId) => kanbanData.tasks[taskId]
						)
						return <Columns key={column.id} column={column} tasks={tasks} />
					})}
				</div>
			</DragDropContext>
		</div>
	)
}
