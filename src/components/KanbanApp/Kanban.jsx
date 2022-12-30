import { AddColumn } from './Column/AddColumn'
import { Columns } from './Column/Columns'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'

import { useSelector } from 'react-redux'

export const Kanban = () => {
	const kanbanData = useSelector((state) => state.kanban.kanbanData)

	const onDragEnd = () => {
		// TODO
	}

	return (
		<div className='p-6 px-[1.5rem] xl:px-[7.5rem] mt-[50px]'>
			<DragDropContext onDragEnd={() => onDragEnd()}>
				<AddColumn />
			<div className='flex gap-3 overflow-auto pb-3 items-start'>
				{kanbanData.map((kanban) => (
					<Columns key={kanban.id} kanban={kanban} />
				))}
			</div>
			</DragDropContext>
		</div>
	)
}
