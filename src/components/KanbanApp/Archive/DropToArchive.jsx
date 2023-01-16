import { Droppable } from '@hello-pangea/dnd'

export const DropToArchive = () => {
	return (
		<Droppable droppableId='dropToArchiveArea' type='column'>
			{(provided) => (
				<div
					{...provided.droppableProps}
					ref={provided.innerRef}
					className='p-2 px-6 justify-center border-[#6366f1] opacity-70 border-2 border-dashed rounded-lg dark:opacity-50 dark:border-white'
				>
					<div className='rounded-lg font-semibold text-[#6366f1] dark:text-white'>
						Drop here to archive
					</div>
				</div>
			)}
		</Droppable>
	)
}
