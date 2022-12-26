import { useDispatch } from 'react-redux'
import { removeColumn, addTask, removeTask } from '../../../store/kanbanSlice'

export const Columns = ({ kanban }) => {
	const dispatch = useDispatch()

	const deleteColumn = (id) => {
		dispatch(removeColumn(id))
	}

	const addNewTask = (id, newTaskText) => {
		const newTask = {
			taskText: newTaskText,
			taskTime: new Date().toLocaleString(),
			taskID: crypto.randomUUID(),
		}
		dispatch(addTask({ id, newTask }))
	}

	const deleteTask = (kanbanID, taskID) => {
		dispatch(removeTask({ kanbanID, taskID }))
	}

	return (
		<div className='mt-[60px]'>
			<div>
				<div className='flex flex-col gap-5 text-white bg-indigo-300 dark:bg-[#202123] rounded-lg w-[350px] p-6'>
					<div className='rounded-lg p-2 flex items-center justify-between'>
						<h3 className='font-semibold text-xl'>{kanban.title}</h3>
						<button
							onClick={() => deleteColumn(kanban.id)}
							className='bg-indigo-400 dark:bg-indigo-700 py-2 px-4 rounded-lg outline-none dark:opacity-40 dark:hover:opacity-100 transition'
						>
							X
						</button>
					</div>
					<div>
						{kanban.tasks.map((task) => (
							<div
								key={crypto.randomUUID()}
								className='bg-indigo-400 dark:bg-[#2a2c2d] rounded-lg p-4 flex flex-col gap-3 mb-4'
							>
								<div className='flex justify-between border-b-2 pb-2'>
									<h4 className='font-bold text-lg'>{task.taskText}</h4>
									<button
										onClick={() => deleteTask(kanban.id, task.taskID)}
										className='px-2 rounded-lg outline-none'
									>
										X
									</button>
								</div>
								<div className='text-sm'>
									<div className='flex flex-col gap-2'>
										<div>{task.taskTime}</div>
									</div>
									<div className='pt-2'>ID: {kanban.id}</div>
								</div>
							</div>
						))}
					</div>
					<button
						onClick={() => addNewTask(kanban.id, 'taskText')}
						className='bg-indigo-400 dark:bg-indigo-700 rounded-lg p-2 opacity-50 hover:opacity-100 transition-all'
					>
						Add
					</button>
				</div>
			</div>
		</div>
	)
}
