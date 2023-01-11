import { AddColumn } from './Column/AddColumn'
import { Columns } from './Column/Columns'

import { setKanban } from '../../store/kanbanSlice'

import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { DropToArchive } from './Archive/DropToArchive'
import { ArchiveButton } from './Archive/ArchiveButton'

export const Kanban = () => {
	const kanbanData = useSelector((state) => state.kanbanApp)
	const dispatch = useDispatch()

	const setInitialData = (state) => {
		dispatch(setKanban(state))
	}

	const onDragEnd = (result) => {
		const { destination, source, draggableId, type } = result

		if (!destination) {
			return
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return
		}

		if (type === 'column') {
			const newColumnOrder = Array.from(kanbanData.columnsOrder)
			newColumnOrder.splice(source.index, 1)
			newColumnOrder.splice(destination.index, 0, draggableId)

			const newState = {
				...kanbanData,
				columnsOrder: newColumnOrder,
			}

			setInitialData(newState)
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
			<div className='flex gap-10 justify-between mb-[60px]'>
				<AddColumn />
				<div className='flex gap-5'>
					<ArchiveButton />
					<DropToArchive />
				</div>
			</div>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable
					droppableId='ColumnsDndArea'
					direction='horizontal'
					type='column'
				>
					{(provided) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className='flex overflow-auto pb-3 items-start'
						>
							{kanbanData.columnsOrder.map((columnId, index) => {
								const column = kanbanData.columns[columnId]
								const tasks = column.tasksOrder.map(
									(taskId) => kanbanData.tasks[taskId]
								)
								return (
									<Columns
										key={column.id}
										column={column}
										tasks={tasks}
										index={index}
									/>
								)
							})}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	)
}
