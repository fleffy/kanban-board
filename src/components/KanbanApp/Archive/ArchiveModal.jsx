import { useSelector } from 'react-redux'
import { ArchiveColumns } from './ArchiveColumns'

export const ArchiveModal = ({ setOpenModal }) => {
	const kanbanData = useSelector((state) => state.kanbanApp)

	return (
		<div
			onClick={() => setOpenModal(false)}
			className='fixed z-50 inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center'
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className=' w-[1250px] h-[750px] bg-white rounded-lg m-5 p-10 dark:bg-[#242526]'
			>
				<div className='flex justify-between'>
					<div className='flex items-center text-2xl font-bold text-indigo-500 dark:text-white'>
						Kanban Archive
					</div>
					<button
						className='bg-indigo-500 dark:bg-indigo-700 py-2 px-4 rounded-lg opacity-60 hover:opacity-100  dark:opacity-60 dark:hover:opacity-100 transition font-semibold text-white'
						onClick={() => setOpenModal(false)}
					>
						X
					</button>
				</div>
				<div className='flex overflow-auto pb-3 items-start pt-10'>
					{kanbanData.archive.map((columnId) => {
						const column = kanbanData.columns[columnId]

						const tasks = column.tasksOrder.map(
							(taskId) => kanbanData.tasks[taskId]
						)

						return (
							<ArchiveColumns key={column.id} tasks={tasks} column={column} />
						)
					})}
				</div>
			</div>
		</div>
	)
}
